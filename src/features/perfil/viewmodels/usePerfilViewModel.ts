import { useState } from 'react';
import { useRouter } from '@/shared/hooks/useRouter';

export function usePerfilViewModel() {
  const router = useRouter();
  const [nombre, setNombre] = useState('Joaquín Díaz');
  const [notifOn, setNotifOn] = useState(true);
  const [ubicacionOn, setUbicacionOn] = useState(true);
  const [ecoOff, setEcoOff] = useState(false);
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [newNameInput, setNewNameInput] = useState('');
  const [showTarjetaSheet, setShowTarjetaSheet] = useState(false);
  const [showCarnetScanner, setShowCarnetScanner] = useState(false);
  const [carnetVerificado, setCarnetVerificado] = useState(false);
  const [metodoPagoGuardado, setMetodoPagoGuardado] = useState<string | null>(null);

  const getIniciales = () =>
    nombre
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  const onSaveName = (newName: string) => {
    if (newName.trim()) {
      setNombre(newName.trim());
    }
    setShowEditAlert(false);
  };

  const onSaveCard = (numero: string) => {
    const ultimos4 = numero.replace(/\D/g, '').slice(-4);
    setMetodoPagoGuardado(ultimos4);
    setShowTarjetaSheet(false);
  };

  const onCaptureCarnet = () => {
    setCarnetVerificado(true);
    setShowCarnetScanner(false);
  };

  return {
    nombre,
    notifOn,
    ubicacionOn,
    ecoOff,
    showEditAlert,
    newNameInput,
    showTarjetaSheet,
    showCarnetScanner,
    carnetVerificado,
    metodoPagoGuardado,
    router,
    setNombre,
    setNotifOn,
    setUbicacionOn,
    setEcoOff,
    setShowEditAlert,
    setNewNameInput,
    setShowTarjetaSheet,
    setShowCarnetScanner,
    setCarnetVerificado,
    setMetodoPagoGuardado,
    getIniciales,
    onSaveName,
    onSaveCard,
    onCaptureCarnet,
  };
}
