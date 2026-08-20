import { useState } from 'react';
import { useRouter } from '@/shared/hooks/useRouter';

export function useBienvenidaViewModel() {
  const router = useRouter();
  const [isPressed, setIsPressed] = useState(false);
  const [showLegalSheet, setShowLegalSheet] = useState(false);

  return { isPressed, setIsPressed, showLegalSheet, setShowLegalSheet, router };
}
