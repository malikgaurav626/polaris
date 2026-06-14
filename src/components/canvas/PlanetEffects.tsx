import { EffectComposer, Bloom, Noise, Vignette, HueSaturation } from '@react-three/postprocessing';
import { useNavigationStore } from '../../store/useNavigationStore';
import { planets } from '../../data/planets';
import { BlendFunction } from 'postprocessing';

export function PlanetEffects() {
  const { currentPlanetIndex } = useNavigationStore();
  const currentPlanet = planets[currentPlanetIndex];
  
  // Define Gas Giants
  const isGasGiant = ['jupiter', 'saturn', 'uranus', 'neptune'].includes(currentPlanet.id);
  
  return (
    <EffectComposer disableNormalPass>
      {/* Global Saturation Bump */}
      <HueSaturation saturation={0.3} hue={0} />
      
      {/* Global Slight Bloom */}
      <Bloom 
        intensity={isGasGiant ? 1.5 : 0.8} 
        luminanceThreshold={0.2} 
        luminanceSmoothing={0.9} 
        blendFunction={BlendFunction.SCREEN} 
      />
      
      {/* Solid Planets get slight surface noise and vignette */}
      {!isGasGiant && (
        <>
          <Noise opacity={0.12} blendFunction={BlendFunction.OVERLAY} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} blendFunction={BlendFunction.NORMAL} />
        </>
      )}
    </EffectComposer>
  );
}
