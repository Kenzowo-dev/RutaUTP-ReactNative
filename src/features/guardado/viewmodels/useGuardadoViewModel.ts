/**
 * =============================================================================
 * GUARDADO VIEWMODEL — Estado y lógica de la pantalla de guardados
 * =============================================================================
 *
 * PROPÓSITO:
 * Maneja el estado de lugares y líneas guardadas, selección de tabs,
 * modales y operaciones CRUD (agregar, seleccionar, eliminar).
 *
 * POR QUÉ SE HIZO ASÍ:
 * - Estado inicial: lugares precargados desde GuardadoService.
 * - CRUD básico: agregar (modal), seleccionar (ver detalle), eliminar (filter).
 * - useCallback: optimiza rendimiento memorizando funciones.
 * - Categoría icon: mapea categoría de lugar a icono de Ionicons.
 */
import { useState, useCallback } from 'react';
import { LugarGuardado, CategoriaLugar, LineaGuardada, AppScreen } from '@/shared/types';
import { useRouter } from '@/shared/hooks/useRouter';
import { GuardadoService } from '../services/GuardadoService';

type Tab = 'lugares' | 'lineas';

export function useGuardadoViewModel() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<Tab>('lugares');
  const [lugares, setLugares] = useState<LugarGuardado[]>(GuardadoService.getSampleLugares());
  const [showAddSheet, setShowAddSheet] = useState(false);
  const [selectedLugar, setSelectedLugar] = useState<LugarGuardado | null>(null);
  const [selectedLinea, setSelectedLinea] = useState<LineaGuardada | null>(null);

  const onAddPlace = useCallback(() => {
    setShowAddSheet(true);
  }, []);

  const onSelectLugar = useCallback((lugar: LugarGuardado) => {
    setSelectedLugar(lugar);
  }, []);

  const onSelectLinea = useCallback((linea: LineaGuardada) => {
    setSelectedLinea(linea);
  }, []);

  const onDeleteLugar = useCallback(() => {
    setLugares((prev) => prev.filter((l) => l.id !== selectedLugar!.id));
    setSelectedLugar(null);
  }, [selectedLugar]);

  return {
    selectedTab,
    setSelectedTab,
    lugares,
    showAddSheet,
    setShowAddSheet,
    selectedLugar,
    setSelectedLugar,
    selectedLinea,
    setSelectedLinea,
    onAddPlace,
    onSelectLugar,
    onSelectLinea,
    onDeleteLugar,
    router,
    lineas: GuardadoService.getLineas(),
    getCategoriaIcon: GuardadoService.getCategoriaIcon,
  };
}
