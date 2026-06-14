import { motion } from 'framer-motion';
import { useNavigationStore } from '../../store/useNavigationStore';
import styles from './StandardLanding.module.css';
import overlayStyles from './Overlay.module.css';

export function StandardLanding() {
  const { setHasLanded, toggleUiMode, uiMode } = useNavigationStore();

  return (
    <motion.div 
      className={styles.container}
      style={{ pointerEvents: 'auto' }}
    >
      <div className={overlayStyles.modeToggle}>
        <button 
          onClick={toggleUiMode}
          style={{
            background: 'transparent',
            border: `1px solid rgba(255,255,255,0.3)`,
            color: '#ffffff',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontFamily: 'Inter'
          }}
        >
          MODE: {uiMode}
        </button>
      </div>

      <div className={styles.navTop}>
        <motion.div layoutId="logo" className={styles.logo}>
          POLARIS
          <span>• • • SYSTEM • • •</span>
        </motion.div>
      </div>

      <div className={styles.content}>
        <motion.div 
          className={styles.leftCol}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <motion.h1 
            layoutId="title-panel"
            className={styles.title}
          >
            OUTER<br/>DIMENSIONS
          </motion.h1>

          <motion.p 
            layoutId="desc-panel"
            className={styles.description}
          >
            A HIGHLY DETAILED INTERACTIVE CELESTIAL SIMULATION ENGINE POWERED BY RAW POINT CLOUD DATA. DESIGNED FOR EXPLORATION OF THE UNKNOWN.
          </motion.p>

          <motion.button 
            layoutId="controls-panel"
            className={styles.enterButton}
            onClick={() => setHasLanded(true)}
          >
            INITIATE EXPLORATION
          </motion.button>
        </motion.div>

        <motion.div 
          layoutId="stats-panel" 
          className={styles.rightCol}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <div className={styles.statBlock}>
            <div className={styles.statNumber}>033</div>
            <div className={styles.statLabel}>SECTORS MAPPED</div>
          </div>
          <div className={styles.statBlock}>
            <div className={styles.statNumber}>100K</div>
            <div className={styles.statLabel}>DATA POINTS</div>
          </div>
          <div className={styles.statBlock}>
            <div className={styles.statNumber}>V.2</div>
            <div className={styles.statLabel}>ENGINE STATUS</div>
          </div>
        </motion.div>
      </div>
      
      <div className={styles.footer}>
        /// VAPORSQUAD • INNER EXPLORATION
      </div>
    </motion.div>
  );
}
