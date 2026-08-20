import { useBienvenidaViewModel } from '@/features/bienvenida/viewmodels/useBienvenidaViewModel';
import BienvenidaView from '@/features/bienvenida/BienvenidaView';

export default function BienvenidaScreen() {
  const viewModel = useBienvenidaViewModel();
  return <BienvenidaView viewModel={viewModel} />;
}
