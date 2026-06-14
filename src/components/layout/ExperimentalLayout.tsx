import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigationStore } from '../../store/useNavigationStore';
import { planets } from '../../data/planets';
import type { PlanetData } from '../../data/planets';
import { 
  TitlePanel, 
  DescPanel, 
  StatsPanel, 
  MissionPanel, 
  AtmospherePanel, 
  EquipmentPanel,
  ControlsPanel
} from './Panels';
import styles from './ExperimentalLayout.module.css';

interface LayoutProps {
  planet: PlanetData;
}

export function ExperimentalLayout({ planet }: LayoutProps) {
  const { currentPlanetIndex, setPlanetIndex } = useNavigationStore();
  const [showData, setShowData] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`${styles.container} experimental-text bg-grid bg-scanline ${showData ? styles.isScrollable : ''}`}>
      
      {/* Left Column: Mission & Atmosphere */}
      <div className={styles.leftColumn}>
        <TitlePanel planet={planet} className={`${styles.title} experimental-heading`} />
        
        <div className={styles.navIndicators}>
          {planets.map((p, i) => (
            <div 
              key={p.id} 
              onClick={() => setPlanetIndex(i)}
              className={`${styles.indicator} ${i === currentPlanetIndex ? styles.active : ''}`} 
            />
          ))}
        </div>

        <button 
          className={styles.mobileDataToggle} 
          onClick={() => setShowData(!showData)}
        >
          {showData ? '[ HIDE DATA ]' : '[ SHOW DATA ]'}
        </button>

        <AnimatePresence>
          {(!isMobile || showData) && (
            <motion.div
              initial={isMobile ? { height: 0, opacity: 0 } : false}
              animate={isMobile ? { height: 'auto', opacity: 1 } : false}
              exit={isMobile ? { height: 0, opacity: 0 } : undefined}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              {!isMobile && (
                <MissionPanel planet={planet} className={styles.panelBox} />
              )}
              <AtmospherePanel planet={planet} className={styles.panelBox} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Column: Equipment, Stats, Controls */}
      <AnimatePresence>
        {(!isMobile || showData) && (
          <motion.div 
            className={styles.rightColumn}
            initial={isMobile ? { height: 0, opacity: 0 } : false}
            animate={isMobile ? { height: 'auto', opacity: 1 } : false}
            exit={isMobile ? { height: 0, opacity: 0 } : undefined}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            {!isMobile && (
              <div className={styles.topRight}>
                <EquipmentPanel planet={planet} className={styles.panelBox} />
              </div>
            )}
            
            <div className={styles.bottomRight}>
              <StatsPanel planet={planet} className={styles.statsGrid} />
              <DescPanel planet={planet} className={styles.descBox} />
              <ControlsPanel className={styles.controlsBox} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
