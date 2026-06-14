import { motion } from 'framer-motion';
import type { PlanetData } from '../../data/planets';
import { useNavigationStore } from '../../store/useNavigationStore';
import styles from './Panels.module.css';

// Reusable animated layout wrapper
interface PanelProps {
  layoutId: string;
  className?: string;
  children: React.ReactNode;
}

function AnimatedPanel({ layoutId, className, children }: PanelProps) {
  return (
    <motion.div
      layoutId={layoutId}
      className={className}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}

// ----------------- PANELS -----------------

export function TitlePanel({ planet, className }: { planet: PlanetData, className?: string }) {
  return (
    <AnimatedPanel layoutId="title-panel" className={className}>
      <h1>{planet.name}</h1>
    </AnimatedPanel>
  );
}

export function DescPanel({ planet, className }: { planet: PlanetData, className?: string }) {
  return (
    <AnimatedPanel layoutId="desc-panel" className={className}>
      <p>{planet.description}</p>
    </AnimatedPanel>
  );
}

export function StatsPanel({ planet, className }: { planet: PlanetData, className?: string }) {
  return (
    <AnimatedPanel layoutId="stats-panel" className={className}>
      {planet.stats.map((stat, i) => (
        <div key={i} className={styles['stat-item']}>
          <span>{stat.label}</span>
          <span>{stat.value}</span>
        </div>
      ))}
    </AnimatedPanel>
  );
}

export function MissionPanel({ planet, className }: { planet: PlanetData, className?: string }) {
  return (
    <AnimatedPanel layoutId="mission-panel" className={className}>
      <div className={styles['panel-header']}>MISSION INFO</div>
      <div className={styles['mission-content']}>
        <h3>{planet.mission}</h3>
        <div className={styles['mission-meta']}>
          <div>
            <span className={styles['label']}>TARGET SYSTEM</span>
            <span>{planet.name} System</span>
          </div>
          <div>
            <span className={styles['label']}>ZONE</span>
            <span>{planet.zone}</span>
          </div>
        </div>
      </div>
      <div className={styles['mission-footer']}>
        <span>REWARD</span>
        <span>9500 ₢</span>
      </div>
    </AnimatedPanel>
  );
}

export function AtmospherePanel({ planet, className }: { planet: PlanetData, className?: string }) {
  return (
    <AnimatedPanel layoutId="atmosphere-panel" className={className}>
      <div className={styles['panel-header']}>ATMOSPHERE ANALYSIS</div>
      <div className={styles['atmosphere-content']}>
        {planet.atmosphere.map((gas, i) => (
          <div key={i} className={styles['gas-item']}>
            <div className={styles['gas-label']}>
              <span>{gas.gas}</span>
              <span>{gas.percentage}%</span>
            </div>
            <div className={styles['gas-bar-bg']}>
              <div className={styles['gas-bar-fill']} style={{ width: `${gas.percentage}%` }} />
            </div>
          </div>
        ))}
      </div>
    </AnimatedPanel>
  );
}

export function EquipmentPanel({ planet, className }: { planet: PlanetData, className?: string }) {
  return (
    <AnimatedPanel layoutId="equipment-panel" className={className}>
      <div className={styles['panel-header']}>RECOMMENDED LOADOUT</div>
      <div className={styles['equipment-content']}>
        <div className={styles['hab-status']}>
          <span className={styles['label']}>HABITABILITY:</span>
          <span className={styles['hab-value']}>{planet.habitability}</span>
        </div>
        <ul className={styles['equip-list']}>
          {planet.equipment.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </AnimatedPanel>
  );
}

export function ControlsPanel({ className }: { className?: string }) {
  const { surfaceGlow, setSurfaceGlow } = useNavigationStore();
  return (
    <AnimatedPanel layoutId="controls-panel" className={className}>
      <div className={styles['slider-wrapper']}>
        <div className={styles['slider-label']}>
          <span>BRIGHTNESS</span>
          <span>{Math.round(surfaceGlow * 100)}%</span>
        </div>
        <input 
          type="range" min="0" max="1" step="0.01" 
          value={surfaceGlow} 
          onChange={(e) => setSurfaceGlow(parseFloat(e.target.value))}
          className={styles['slider']}
        />
      </div>
    </AnimatedPanel>
  );
}
