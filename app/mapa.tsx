import { useMapaViewModel } from '@/features/mapa/viewmodels/useMapaViewModel';
import { MapaView } from '@/features/mapa/MapaView';

export default function MapaScreen() {
  const viewModel = useMapaViewModel();
  return <MapaView viewModel={viewModel} />;
}
