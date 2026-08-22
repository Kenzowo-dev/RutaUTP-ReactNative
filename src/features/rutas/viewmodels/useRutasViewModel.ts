/**
 * =============================================================================
 * RUTAS VIEWMODEL — Estado y lógica de la pantalla de rutas
 * =============================================================================
 *
 * PROPÓSITO:
 * Maneja la selección de ruta y el estado de la navegación simulada.
 *
 * POR QUÉ SE HIZO ASÍ:
 * - rutaSeleccionada: controla si se muestra la lista o el detalle.
 * - showNav: controla la visibilidad del modal de navegación CarPlay.
 * - useCallback: memoriza funciones para evitar re-renders innecesarios.
 */
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
