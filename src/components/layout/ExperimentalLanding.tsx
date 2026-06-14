import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigationStore } from '../../store/useNavigationStore';
import { 
  TitlePanel, 
  DescPanel, 
  StatsPanel, 
  MissionPanel, 
  AtmospherePanel, 
  EquipmentPanel
} from './Panels';
import styles from './ExperimentalLayout.module.css';
import landingStyles from './ExperimentalLanding.module.css';
import overlayStyles from './Overlay.module.css';

export function ExperimentalLanding() {
  const { setHasLanded, toggleUiMode } = useNavigationStore();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mockPlanet = {
    id: "landing",
    name: "POLARIS_CORE",
    description: "A highly detailed interactive celestial simulation engine powered by raw point cloud data. Designed for exploration of the unknown.",
    stats: [
      { label: "Sectors Mapped", value: "033" },
      { label: "Data Points", value: "100K" },
      { label: "Engine Status", value: "V.2" },
    ],
    modelUrl: "",
    mission: "INITIALIZE SYSTEM OVERRIDE",
    zone: "SYS.OVERRIDE",
    habitability: "OK: SYNCHRONIZED",
    atmosphere: [
      { gas: "MEM", percentage: 100 },
      { gas: "GPU", percentage: 100 }
    ],
    equipment: ["SYSTEM_READY", "DATA_SYNCED"]
  };

  return (
    <motion.div 
      className={`${styles.container} experimental-text bg-grid bg-scanline`}
      style={{ pointerEvents: 'auto' }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <div className={landingStyles.scanlines} />
      
      <div className={overlayStyles.modeToggle}>
        <button className={landingStyles.modeToggle} onClick={toggleUiMode}>
          [ MODE: EXPERIMENTAL ]
        </button>
      </div>

      <div className={styles.leftColumn} style={{ zIndex: 20 }}>
        <div className={landingStyles.glitchText} data-text="SYS.OVERRIDE" style={{ marginBottom: '10px' }}>SYS.OVERRIDE</div>
        <TitlePanel planet={mockPlanet} className={`${styles.title} experimental-heading`} />

        {!isMobile && (
          <MissionPanel planet={mockPlanet} className={styles.panelBox} />
        )}
        {!isMobile && (
          <AtmospherePanel planet={mockPlanet} className={styles.panelBox} />
        )}
      </div>

      <div 
        style={{
          position: 'absolute',
          bottom: 60,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          pointerEvents: 'auto'
        }}
      >
        <motion.button 
          layoutId="controls-panel"
          className={landingStyles.enterButton} 
          onClick={() => setHasLanded(true)}
        >
          ENGAGE DIRECTIVE
        </motion.button>
      </div>

      <div className={styles.rightColumn} style={{ zIndex: 20 }}>
        {!isMobile && (
          <div className={styles.topRight}>
            <EquipmentPanel planet={mockPlanet} className={styles.panelBox} />
          </div>
        )}
        
        <div className={styles.bottomRight}>
          <StatsPanel planet={mockPlanet} className={styles.statsGrid} />
          {!isMobile && (
            <DescPanel planet={mockPlanet} className={styles.descBox} />
          )}
        </div>
      </div>
    </motion.div>
  );
}
