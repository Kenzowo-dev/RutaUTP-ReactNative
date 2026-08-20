import { useState, useEffect, useRef } from 'react';
import { DestinoChip } from '@/shared/types';
import { useRouter } from '@/shared/hooks/useRouter';
import { MapaService, BusSimulado } from '@/features/mapa/services/MapaService';

export function useMapaViewModel() {
  const router = useRouter();
  const [mostrarDrawer, setMostrarDrawer] = useState(false);
  const [showReportarSheet, setShowReportarSheet] = useState(false);
  const [showReportSuccess, setShowReportSuccess] = useState(false);
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [destinoSeleccionado, setDestinoSeleccionado] = useState<DestinoChip | null>(null);
  const [region, setRegion] = useState({
    latitude: -8.1116,
    longitude: -79.0287,
    latitudeDelta: 0.035,
    longitudeDelta: 0.035,
  });
  const [buses, setBuses] = useState<BusSimulado[]>([]);
  const [campoEnfocado, setCampoEnfocado] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const spawnBuses = (destino: DestinoChip) => {
    if (timerRef.current) clearInterval(timerRef.current);
    const nuevos = MapaService.spawnBuses(destino);
    setBuses(nuevos);
    timerRef.current = setInterval(() => {
      setBuses((prev) =>
        prev.map((b) => {
          const rad = (b.angulo * Math.PI) / 180;
          return {
            ...b,
            lat: b.lat + Math.sin(rad) * b.velocidad,
            lon: b.lon + Math.cos(rad) * b.velocidad,
            angulo: Math.random() < 0.002 ? Math.random() * 360 : b.angulo,
          };
        })
      );
    }, 50);
  };

  const seleccionarDestino = (destino: DestinoChip) => {
    setCampoEnfocado(false);
    if (destinoSeleccionado?.id === destino.id) return;
    setDestinoSeleccionado(destino);
    setTextoBusqueda(destino.label);
    setRegion({
      latitude: destino.lat,
      longitude: destino.lon,
      latitudeDelta: 0.025,
      longitudeDelta: 0.025,
    });
    spawnBuses(destino);
  };

  const buscarTexto = (texto: string) => {
    const t = texto.trim();
    if (!t) return;
    const match = MapaService.getDestinos().find((d) => d.label.toLowerCase().includes(t.toLowerCase()));
    if (match) seleccionarDestino(match);
  };

  const limpiar = () => {
    setTextoBusqueda('');
    setDestinoSeleccionado(null);
    setBuses([]);
    if (timerRef.current) clearInterval(timerRef.current);
    setRegion({
      latitude: -8.1116,
      longitude: -79.0287,
      latitudeDelta: 0.035,
      longitudeDelta: 0.035,
    });
  };

  const chipActivo = (destino: DestinoChip) => destinoSeleccionado?.id === destino.id;

  return {
    mostrarDrawer,
    setMostrarDrawer,
    showReportarSheet,
    setShowReportarSheet,
    showReportSuccess,
    setShowReportSuccess,
    textoBusqueda,
    setTextoBusqueda,
    destinoSeleccionado,
    region,
    setRegion,
    buses,
    campoEnfocado,
    setCampoEnfocado,
    spawnBuses,
    seleccionarDestino,
    buscarTexto,
    limpiar,
    chipActivo,
    router,
  };
}
