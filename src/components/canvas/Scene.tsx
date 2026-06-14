import { OrbitControls, Stars } from '@react-three/drei';
import { PlanetMorpher } from './PlanetMorpher';
import { PlanetEffects } from './PlanetEffects';
import { useNavigationStore } from '../../store/useNavigationStore';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
export function Scene() {
  const { hasLanded } = useNavigationStore();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Smoothly animate camera/group position based on landing state
    const targetX = hasLanded ? 0 : 0;
    const targetZ = hasLanded ? 0 : -2; // Push back slightly on landing

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.05);
  });

  return (
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      <PlanetMorpher />
      <PlanetEffects />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3}
        maxDistance={15}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </group>
  );
}
