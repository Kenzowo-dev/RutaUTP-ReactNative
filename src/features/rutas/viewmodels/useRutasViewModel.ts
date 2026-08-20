import { useState, useCallback } from 'react';
import { useRouter } from '@/shared/hooks/useRouter';
import { RutaOpcion } from '@/shared/types';

export function useRutasViewModel() {
  const router = useRouter();
  const [rutaSeleccionada, setRutaSeleccionada] = useState<RutaOpcion | null>(null);
  const [showNav, setShowNav] = useState(false);

  const onSelectRuta = useCallback((ruta: RutaOpcion) => {
    setRutaSeleccionada(ruta);
  }, []);

  const onBack = useCallback(() => {
    setRutaSeleccionada(null);
    setShowNav(false);
  }, []);

  const onStartNav = useCallback(() => {
    setShowNav(true);
  }, []);

  const onFinishNav = useCallback(() => {
    setShowNav(false);
  }, []);

  return {
    rutaSeleccionada,
    onSelectRuta,
    onBack,
    showNav,
    setShowNav,
    onStartNav,
    onFinishNav,
    router,
  };
}
