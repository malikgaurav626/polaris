import { Canvas } from '@react-three/fiber';
import { useNavigationStore } from './store/useNavigationStore';
import { Landing } from './components/layout/Landing';
import { Overlay } from './components/layout/Overlay';
import { Scene } from './components/canvas/Scene';

import { AnimatePresence } from 'framer-motion';

function App() {
  const hasLanded = useNavigationStore((state) => state.hasLanded);

  return (
    <div className="app-container">
      {/* 3D Canvas Background */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      >
        <Scene />
      </Canvas>

      {/* UI Overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, pointerEvents: 'none' }}>
        <AnimatePresence>
          {!hasLanded ? <Landing key="landing" /> : <Overlay key="overlay" />}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
