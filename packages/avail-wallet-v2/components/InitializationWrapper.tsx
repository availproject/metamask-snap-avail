'use client';

import { useInitializationStore } from '@/lib/store/initialization';
import { useInitialization } from '@/lib/hooks/useInitialization';
import Preloader from './Preloader';

export default function InitializationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isInitializing, initializationMessage } = useInitializationStore();
  useInitialization();

  return (
    <>
      {isInitializing && <Preloader message={initializationMessage} />}
      {children}
    </>
  );
} 
