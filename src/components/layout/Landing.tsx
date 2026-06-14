import { useNavigationStore } from '../../store/useNavigationStore';
import { StandardLanding } from './StandardLanding';
import { ExperimentalLanding } from './ExperimentalLanding';

export function Landing() {
  const { uiMode } = useNavigationStore();

  return uiMode === 'standard' ? <StandardLanding /> : <ExperimentalLanding />;
}
