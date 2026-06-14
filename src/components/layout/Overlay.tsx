import { useEffect } from 'react';
import { LayoutGroup, motion } from 'framer-motion';
import { useNavigationStore } from '../../store/useNavigationStore';
import { planets } from '../../data/planets';
import { StandardLayout } from './StandardLayout';
import { ExperimentalLayout } from './ExperimentalLayout';
import styles from './Overlay.module.css';

export function Overlay() {
  const { currentPlanetIndex, uiMode, toggleUiMode, nextPlanet, prevPlanet } = useNavigationStore();
  const planet = planets[currentPlanetIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextPlanet();
      if (e.key === 'ArrowLeft') prevPlanet();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPlanet, prevPlanet]);

  return (
    <motion.div
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      {uiMode === 'standard' ? (
        <StandardLayout planet={planet} />
      ) : (
        <ExperimentalLayout planet={planet} />
      )}

      {/* Global UI Mode Toggle */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className={styles.modeToggle}
      >
        <button 
          onClick={toggleUiMode}
          style={{
            background: 'transparent',
            border: `1px solid ${uiMode === 'standard' ? 'rgba(255,255,255,0.3)' : '#ff3366'}`,
            color: uiMode === 'standard' ? '#ffffff' : '#ff3366',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontFamily: uiMode === 'standard' ? 'Inter' : 'Share Tech Mono',
            whiteSpace: 'nowrap'
          }}
        >
          MODE: {uiMode}
        </button>
      </motion.div>

      {/* Global Navigation Arrows */}
      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        onClick={prevPlanet}
        className={`${styles.navArrow} ${uiMode === 'standard' ? styles.navArrowLeft : styles.navArrowLeftExperimental}`}
        style={{
          color: uiMode === 'standard' ? 'rgba(255,255,255,0.3)' : 'rgba(0,255,204,0.3)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = uiMode === 'standard' ? '#fff' : '#00ffcc';
          e.currentTarget.style.transform = window.innerWidth <= 768 ? 'scale(1.2)' : 'translateY(-50%) scale(1.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = uiMode === 'standard' ? 'rgba(255,255,255,0.3)' : 'rgba(0,255,204,0.3)';
          e.currentTarget.style.transform = window.innerWidth <= 768 ? 'none' : 'translateY(-50%) scale(1)';
        }}
      >
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </motion.button>

      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        onClick={nextPlanet}
        className={`${styles.navArrow} ${uiMode === 'standard' ? styles.navArrowRight : styles.navArrowRightExperimental}`}
        style={{
          color: uiMode === 'standard' ? 'rgba(255,255,255,0.3)' : 'rgba(0,255,204,0.3)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = uiMode === 'standard' ? '#fff' : '#00ffcc';
          e.currentTarget.style.transform = window.innerWidth <= 768 ? 'scale(1.2)' : 'translateY(-50%) scale(1.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = uiMode === 'standard' ? 'rgba(255,255,255,0.3)' : 'rgba(0,255,204,0.3)';
          e.currentTarget.style.transform = window.innerWidth <= 768 ? 'none' : 'translateY(-50%) scale(1)';
        }}
      >
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </motion.button>
    </motion.div>
  );
}
