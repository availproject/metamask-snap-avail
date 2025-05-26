'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface PreloaderProps {
  message?: string;
}

export default function Preloader({ message = 'Initializing...' }: PreloaderProps) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 10) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#23242B] bg-opacity-90 flex flex-col items-center justify-center z-50">
      <div 
        className="relative w-28 h-28 mb-8"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <Image
          src="/logo-icon.svg"
          alt="Avail Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      <div className="text-white text-lg font-medium">{message}</div>
    </div>
  );
} 
