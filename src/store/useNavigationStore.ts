import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { planets } from '../data/planets';

interface NavigationState {
  currentPlanetIndex: number;
  nextPlanet: () => void;
  prevPlanet: () => void;
  setPlanetIndex: (index: number) => void;
  hasLanded: boolean;
  setHasLanded: (landed: boolean) => void;
  surfaceGlow: number;
  setSurfaceGlow: (glow: number) => void;
  uiMode: 'standard' | 'experimental';
  toggleUiMode: () => void;
  isModelLoading: boolean;
  setModelLoading: (loading: boolean) => void;
}

export const useNavigationStore = create<NavigationState>()(
  persist(
    (set) => ({
      currentPlanetIndex: 0,
      hasLanded: false,
      surfaceGlow: 0.0,
      uiMode: 'standard',
      isModelLoading: true, // Start true initially until first planet loads
      nextPlanet: () => 
        set((state) => ({ 
          currentPlanetIndex: (state.currentPlanetIndex + 1) % planets.length 
        })),
      prevPlanet: () => 
        set((state) => ({ 
          currentPlanetIndex: state.currentPlanetIndex === 0 ? planets.length - 1 : state.currentPlanetIndex - 1 
        })),
      setPlanetIndex: (index) => set({ currentPlanetIndex: index }),
      setHasLanded: (landed) => set({ hasLanded: landed }),
      setSurfaceGlow: (glow) => set({ surfaceGlow: glow }),
      toggleUiMode: () => set((state) => ({ 
        uiMode: state.uiMode === 'standard' ? 'experimental' : 'standard' 
      })),
      setModelLoading: (loading) => set({ isModelLoading: loading }),
    }),
    {
      name: 'polaris-storage',
      partialize: (state) => ({ 
        uiMode: state.uiMode
      }),
    }
  )
);
