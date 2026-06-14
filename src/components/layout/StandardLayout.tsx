import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigationStore } from '../../store/useNavigationStore';
import { planets } from '../../data/planets';
import type { PlanetData } from '../../data/planets';
import styles from './StandardLayout.module.css';

interface LayoutProps {
  planet: PlanetData;
}

export function StandardLayout({ planet }: LayoutProps) {
  const { currentPlanetIndex, setPlanetIndex, surfaceGlow, setSurfaceGlow, isModelLoading } = useNavigationStore();
  const [showData, setShowData] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`${styles.container} ${showData ? styles.isScrollable : ''}`}>
      
      <div className={styles.topBar}>
        <motion.div layoutId="logo" className={styles.logo}>
          POLARIS
          <span>• • • SYSTEM • • •</span>
        </motion.div>
      </div>

      <div className={styles.content}>
        <div className={styles.leftCol}>
          <motion.div 
            className={styles.navIndicators}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {planets.map((p, i) => (
              <div 
                key={p.id} 
                onClick={() => setPlanetIndex(i)}
                className={`${styles.indicator} ${i === currentPlanetIndex ? styles.active : ''}`} 
              />
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            {isModelLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ marginBottom: '24px' }}
              >
                <h1 className={styles.title} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '2rem' }}>[ LOADING DATA... ]</h1>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ marginBottom: '24px' }}
              >
                <motion.h1
                  layoutId="title-panel"
                  className={styles.title}
                >
                  {planet.name}
                </motion.h1>

                <motion.p 
                  layoutId="desc-panel" 
                  className={styles.description}
                >
                  {planet.description}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
          
          <button 
            className={styles.mobileDataToggle} 
            onClick={() => setShowData(!showData)}
          >
            {showData ? '[-] HIDE DATA' : '[+] SHOW DATA'}
          </button>

        </div>

        <AnimatePresence>
          {(!isMobile || showData) && (
            <motion.div 
              className={styles.rightCol}
              initial={isMobile ? { height: 0, opacity: 0 } : false}
              animate={isMobile ? { height: 'auto', opacity: 1 } : false}
              exit={isMobile ? { height: 0, opacity: 0 } : undefined}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <motion.div layoutId="stats-panel" className={styles.statsContainer}>
                {isModelLoading ? (
                  <div style={{ color: 'rgba(255,255,255,0.4)', padding: '20px', fontFamily: 'monospace' }}>[ BUFFERING METRICS... ]</div>
                ) : (
                  planet.stats.map((stat, i) => (
                    <div key={i} className={styles.statBlock}>
                      <div className={styles.statNumber}>{stat.value.split(' ')[0]}</div>
                      <div className={styles.statLabel}>{stat.label} - {stat.value}</div>
                    </div>
                  ))
                )}
              </motion.div>
              
              <motion.div layoutId="controls-panel" className={styles.controls}>
                <div className={styles.sliderWrapper}>
                  <div className={styles.sliderLabel}>
                    <span>BRIGHTNESS</span>
                    <span>{Math.round(surfaceGlow * 100)}%</span>
                  </div>
                  <input 
                    type="range" min="0" max="1" step="0.01" 
                    value={surfaceGlow} 
                    onChange={(e) => setSurfaceGlow(parseFloat(e.target.value))}
                    className={styles.slider}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
    </div>
  );
}
