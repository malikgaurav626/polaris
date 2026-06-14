import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useNavigationStore } from '../../store/useNavigationStore';
import { planets } from '../../data/planets';

// Custom shader for morphing point clouds
const vertexShader = `
  attribute vec3 color;
  attribute vec3 targetPosition;
  attribute vec3 targetColor;
  
  uniform float uMorphProgress;
  uniform float uTime;
  
  varying vec3 vColor;
  varying float vLight;
  
  void main() {
    
    // Generate a pseudo-random scatter vector based on the vertex's starting position
    vec3 randomScatter = vec3(
      sin(position.y * 134.0 + position.z * 23.0),
      cos(position.x * 111.0 - position.z * 54.0),
      sin(position.x * 87.0 + position.y * 14.0)
    );
    
    // Direction of the explosion: outwards + random scatter
    vec3 explodeDir = normalize(position + randomScatter * 0.5);
    
    // Phase 1: Travel and Explosion (happens from 0.0 to 0.7)
    float phase1 = clamp(uMorphProgress / 0.7, 0.0, 1.0);
    
    // Explosion intensity curve: 0 at start, 1 in middle, 0 at end of phase1
    float explosionPower = sin(phase1 * 3.14159);
    
    // Interpolate base position and color with smoothstep for graceful acceleration
    float smoothProgress = smoothstep(0.0, 1.0, phase1);
    vec3 mixedPos = mix(position, targetPosition, smoothProgress);
    vColor = mix(color, targetColor, smoothProgress);
    
    // Apply explosion displacement
    mixedPos += explodeDir * (explosionPower * 3.0);
    
    // --- LIGHTING (Sun Source) ---
    // Calculate normal from the base mixed position (assuming sphere at origin)
    // The sun is far off to the right and slightly front/top
    vec3 normal = normalize(mixedPos);
    vec3 sunDir = normalize(vec3(1.0, 0.4, 0.8)); 
    float diffuse = max(dot(normal, sunDir), 0.0);
    float ambient = 0.15; // Minimum light so the dark side isn't pitch black
    vLight = diffuse + ambient;
    
    // Phase 2: Apply "bing" spring effect just at the final end (0.7 to 1.0)
    // By this time, the points are already perfectly in place.
    float scaleBob = 1.0;
    if (uMorphProgress > 0.7) {
        float bobTime = (uMorphProgress - 0.7) * 3.3333; // Maps 0.7->1.0 to 0.0->1.0
        float damp = 1.0 - bobTime; // Decays to 0 as it settles
        // Smooth 1-cycle sine wave (shrink -> expand -> perfectly settle)
        scaleBob += -sin(bobTime * 3.14159 * 2.0) * 0.12 * damp;
    }
    
    // Scale the final position by the bob factor
    mixedPos *= scaleBob;
    
    vec4 mvPosition = modelViewMatrix * vec4(mixedPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Size attenuation
    gl_PointSize = (12.0 / -mvPosition.z);
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vLight;
  uniform float uSurfaceGlow;
  
  void main() {
    // Make points circular instead of square
    vec2 xy = gl_PointCoord.xy - vec2(0.5);
    float ll = length(xy);
    if (ll > 0.5) discard;
    
    // Soft edge
    float alpha = smoothstep(0.5, 0.4, ll);
    
    // Increase saturation
    float luminance = dot(vColor, vec3(0.299, 0.587, 0.114));
    vec3 saturatedColor = mix(vec3(luminance), vColor, 2.0); // 2x saturation
    
    // Apply directional lighting
    vec3 finalColor = saturatedColor * vLight;
    
    // Then apply surface emittance
    finalColor += finalColor * (uSurfaceGlow * 3.0);
    
    // Prevent colors from blowing out past 1.0 (unless we want bloom, but clamp keeps it clean)
    finalColor = clamp(finalColor, 0.0, 1.0);
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

const geometryCache: Record<string, { pos: Float32Array, col: Float32Array }> = {};

export function PlanetMorpher() {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { currentPlanetIndex, hasLanded, surfaceGlow, setModelLoading } = useNavigationStore();

  // State for the geometry arrays
  const [currentGeometry, setCurrentGeometry] = useState<{ pos: Float32Array, col: Float32Array } | null>(null);
  const [targetGeometry, setTargetGeometry] = useState<{ pos: Float32Array, col: Float32Array } | null>(null);
  const [initialLoaded, setInitialLoaded] = useState(false);

  // Animation state
  const morphProgress = useRef(0);
  const isMorphing = useRef(false);
  const targetPlanetIndex = useRef(currentPlanetIndex);

  // Fetch bin file helper
  const fetchPlanetData = async (url: string, isBackground = false) => {
    if (geometryCache[url]) {
      if (!isBackground) setModelLoading(false);
      return geometryCache[url];
    }

    if (!isBackground) setModelLoading(true);

    const res = await fetch(url);
    const buffer = await res.arrayBuffer();
    const data = new Float32Array(buffer);

    const numPoints = data.length / 6;
    const positions = new Float32Array(numPoints * 3);
    const colors = new Float32Array(numPoints * 3);

    for (let i = 0; i < numPoints; i++) {
      positions[i * 3 + 0] = data[i * 6 + 0];
      positions[i * 3 + 1] = data[i * 6 + 1];
      positions[i * 3 + 2] = data[i * 6 + 2];

      colors[i * 3 + 0] = data[i * 6 + 3];
      colors[i * 3 + 1] = data[i * 6 + 4];
      colors[i * 3 + 2] = data[i * 6 + 5];
    }

    const geom = { pos: positions, col: colors };
    geometryCache[url] = geom;
    if (!isBackground) setModelLoading(false);
    return geom;
  };

  // Initial Load
  useEffect(() => {
    fetchPlanetData(planets[0].modelUrl).then(data => {
      setCurrentGeometry(data);
      setTargetGeometry(data); // Initial target is same as current
      setInitialLoaded(true);
    });
  }, []);

  // Background Prefetching Queue
  useEffect(() => {
    if (!initialLoaded) return;
    
    const prefetchAll = async () => {
      for (let i = 1; i < planets.length; i++) {
        const url = planets[i].modelUrl;
        if (!geometryCache[url]) {
          try {
            await fetchPlanetData(url, true);
          } catch (e) {
            console.warn("Failed to prefetch", url, e);
          }
        }
      }
    };
    
    // Small delay to let the initial rendering settle
    setTimeout(prefetchAll, 2000);
  }, [initialLoaded]);

  // Handle Planet Change
  useEffect(() => {
    if (currentPlanetIndex !== targetPlanetIndex.current) {
      targetPlanetIndex.current = currentPlanetIndex;

      fetchPlanetData(planets[currentPlanetIndex].modelUrl).then(data => {
        setTargetGeometry(data);
        morphProgress.current = 0; // Reset progress only when a NEW morph begins
        isMorphing.current = true;
      });
    }
  }, [currentPlanetIndex]);

  useFrame((state, delta) => {
    if (!materialRef.current || !meshRef.current) return;

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uSurfaceGlow.value = surfaceGlow;

    // Smoothly interpolate scale based on landing state
    const targetScale = hasLanded ? 1.5 : 2.5;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);

    // Slow rotation
    meshRef.current.rotation.y += delta * 0.05;

    // Apply tilt if Uranus
    const isUranus = planets[currentPlanetIndex].id === 'uranus';
    const targetTiltX = isUranus ? Math.PI / 9 : 0; // Tilt 30 degrees downwards for Uranus
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetTiltX, 0.05);

    // Morphing logic
    if (isMorphing.current) {
      morphProgress.current += delta * 0.7; // Slowed down for explosion effect

      if (morphProgress.current >= 1) {
        morphProgress.current = 1;
        isMorphing.current = false;

        // Swap current to target so we are ready for next morph
        if (targetGeometry) {
          setCurrentGeometry(targetGeometry);
          // We DO NOT reset morphProgress to 0 here! 
          // Leaving it at 1.0 forces the shader to keep rendering targetGeometry
          // until React has time to fully swap the WebGL buffers in the background.
        }
      }

      materialRef.current.uniforms.uMorphProgress.value = morphProgress.current;
    }
  });

  const geomRef = useRef<THREE.BufferGeometry>(null);

  useEffect(() => {
    if (geomRef.current) {
      if (geomRef.current.attributes.position) geomRef.current.attributes.position.needsUpdate = true;
      if (geomRef.current.attributes.color) geomRef.current.attributes.color.needsUpdate = true;
      if (geomRef.current.attributes.targetPosition) geomRef.current.attributes.targetPosition.needsUpdate = true;
      if (geomRef.current.attributes.targetColor) geomRef.current.attributes.targetColor.needsUpdate = true;
    }
  }, [currentGeometry, targetGeometry]);

  if (!currentGeometry || !targetGeometry) return null;

  return (
    <points ref={meshRef} position={[0, 0, 0]}>
      <bufferGeometry ref={geomRef}>
        {/* @ts-ignore */}
        <bufferAttribute
          attach="attributes-position"
          count={currentGeometry.pos.length / 3}
          array={currentGeometry.pos}
          itemSize={3}
          needsUpdate={true}
        />
        {/* @ts-ignore */}
        <bufferAttribute
          attach="attributes-color"
          count={currentGeometry.col.length / 3}
          array={currentGeometry.col}
          itemSize={3}
          needsUpdate={true}
        />
        {/* @ts-ignore */}
        <bufferAttribute
          attach="attributes-targetPosition"
          count={targetGeometry.pos.length / 3}
          array={targetGeometry.pos}
          itemSize={3}
          needsUpdate={true}
        />
        {/* @ts-ignore */}
        <bufferAttribute
          attach="attributes-targetColor"
          count={targetGeometry.col.length / 3}
          array={targetGeometry.col}
          itemSize={3}
          needsUpdate={true}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
        depthWrite={false}
        blending={THREE.NormalBlending}
        uniforms={{
          uMorphProgress: { value: 0 },
          uTime: { value: 0 },
          uSurfaceGlow: { value: surfaceGlow }
        }}
      />
    </points>
  );
}
