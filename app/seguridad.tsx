import { useSeguridadViewModel } from '@/features/seguridad/viewmodels/useSeguridadViewModel';
import { SeguridadView } from '@/features/seguridad/SeguridadView';

export default function SeguridadScreen() {
  const viewModel = useSeguridadViewModel();
  return <SeguridadView viewModel={viewModel} />;
}
