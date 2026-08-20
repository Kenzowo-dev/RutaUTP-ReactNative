import { usePerfilViewModel } from '@/features/perfil/viewmodels/usePerfilViewModel';
import PerfilView from '@/features/perfil/PerfilView';

export default function PerfilScreen() {
  const viewModel = usePerfilViewModel();
  return <PerfilView viewModel={viewModel} />;
}
