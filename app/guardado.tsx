import { useGuardadoViewModel } from '@/features/guardado/viewmodels/useGuardadoViewModel';
import GuardadoView from '@/features/guardado/GuardadoView';

export default function GuardadoScreen() {
  const viewModel = useGuardadoViewModel();
  return <GuardadoView {...viewModel} />;
}
