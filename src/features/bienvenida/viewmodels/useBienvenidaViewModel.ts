/**
 * =============================================================================
 * BIENVENIDA VIEWMODEL — Estado y lógica de la pantalla de bienvenida
 * =============================================================================
 *
 * PROPÓSITO:
 * Maneja el estado de la pantalla de onboarding: presión del botón CTA
 * y visibilidad del sheet de términos de servicio.
 *
 * POR QUÉ SE HIZO ASÍ:
 * - isPressed: controla la animación de escala del botón "Comenzar".
 * - showLegalSheet: alterna la visibilidad del modal de términos.
 * - router: permite navegar al mapa cuando el usuario acepta/comienza.
 */
import { useState } from 'react';
import { useRouter } from '@/shared/hooks/useRouter';

export function useBienvenidaViewModel() {
  const router = useRouter();
  const [isPressed, setIsPressed] = useState(false);
  const [showLegalSheet, setShowLegalSheet] = useState(false);

  return { isPressed, setIsPressed, showLegalSheet, setShowLegalSheet, router };
}
