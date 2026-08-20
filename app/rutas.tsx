import { useRutasViewModel } from '@/features/rutas/viewmodels/useRutasViewModel';
import RutasView from '@/features/rutas/RutasView';

export default function RutasScreen() {
  const viewModel = useRutasViewModel();
  return <RutasView viewModel={viewModel} />;
}
