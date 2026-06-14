import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Billboard, Line } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigationStore } from '../../store/useNavigationStore';
import { planets } from '../../data/planets';

export function OrbitingText() {
  const groupRef = useRef<THREE.Group>(null);
  const { currentPlanetIndex, hasLanded } = useNavigationStore();

  const planet = planets[currentPlanetIndex];

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Scale matches the planet's scale
      const targetScale = hasLanded ? 1.5 : 2.5;
      // Add a tiny bit of padding to the bounding box scale
      const boxScale = targetScale * 1.1; 
      groupRef.current.scale.lerp(new THREE.Vector3(boxScale, boxScale, boxScale), 0.05);
    }
  });

  // Box coordinates (1 unit size, scaled by group)
  // Drawn as a continuous line loop
  const boxPoints = [
    new THREE.Vector3(-1, 1, 0),
    new THREE.Vector3(1, 1, 0),
    new THREE.Vector3(1, -1, 0),
    new THREE.Vector3(-1, -1, 0),
    new THREE.Vector3(-1, 1, 0),
  ];

  return (
    <Billboard position={[0, 0, 0]}>
      <group ref={groupRef}>
        {/* The Bounding Box */}
        <Line 
          points={boxPoints}
          color="#d33833" 
          lineWidth={1.5}
          transparent
          opacity={0.6}
        />

        {/* The Planet Name attached to the top left of the box */}
        <Text
          position={[-0.95, 1.2, 0]}
          fontSize={0.4}
          color="#eeeeee"
          characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
          anchorX="left"
          anchorY="bottom"
          fontWeight="bold"
        >
          {planet.name.toUpperCase()}
        </Text>
      </group>
    </Billboard>
  );
}
