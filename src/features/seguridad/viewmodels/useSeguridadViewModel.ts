import { useState, useMemo } from 'react';
import { ReporteComunidad, RutaSegura, TipoReporte } from '@/shared/types';
import { useRouter } from '@/shared/hooks/useRouter';
import { Colors } from '@/shared/constants';

export interface SeguridadViewModelReturn {
  showReportarSheet: boolean;
  setShowReportarSheet: (v: boolean) => void;
  showLlamarAlert: boolean;
  setShowLlamarAlert: (v: boolean) => void;
  selectedReporte: ReporteComunidad | null;
  setSelectedReporte: (v: ReporteComunidad | null) => void;
  selectedRutaIndex: number | null;
  setSelectedRutaIndex: (v: number | null) => void;
  saludoDinamico: string;
  fechaActual: string;
  getTipoBg: (tipo: TipoReporte) => string;
  getTipoFg: (tipo: TipoReporte) => string;
  router: ReturnType<typeof useRouter>;
}

export function useSeguridadViewModel(): SeguridadViewModelReturn {
  const router = useRouter();
  const [showReportarSheet, setShowReportarSheet] = useState(false);
  const [showLlamarAlert, setShowLlamarAlert] = useState(false);
  const [selectedReporte, setSelectedReporte] = useState<ReporteComunidad | null>(null);
  const [selectedRutaIndex, setSelectedRutaIndex] = useState<number | null>(null);

  const saludoDinamico = useMemo(() => {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return 'Buenos días';
    if (h >= 12 && h < 19) return 'Buenas tardes';
    return 'Buenas noches';
  }, []);

  const fechaActual = useMemo(() => {
    const f = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    const es: any = { ...options };
    return f.toLocaleDateString('es-PE', es);
  }, []);

  const getTipoBg = (tipo: TipoReporte): string => {
    switch (tipo) {
      case 'ALERTA': return Colors.errorContainer;
      case 'TRÁFICO': return Colors.secondaryContainer;
      case 'SUGERENCIA': return Colors.tertiaryContainer;
      default: return Colors.surfaceContainerHigh;
    }
  };

  const getTipoFg = (tipo: TipoReporte): string => {
    switch (tipo) {
      case 'ALERTA': return Colors.onErrorContainer;
      case 'TRÁFICO': return Colors.onSecondaryContainer;
      case 'SUGERENCIA': return Colors.onTertiaryContainer;
      default: return Colors.onSurfaceVariant;
    }
  };

  return {
    showReportarSheet,
    setShowReportarSheet,
    showLlamarAlert,
    setShowLlamarAlert,
    selectedReporte,
    setSelectedReporte,
    selectedRutaIndex,
    setSelectedRutaIndex,
    saludoDinamico,
    fechaActual,
    getTipoBg,
    getTipoFg,
    router,
  };
}
