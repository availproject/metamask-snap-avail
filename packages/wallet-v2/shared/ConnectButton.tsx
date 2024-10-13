'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAvailSnap } from '@/services/metamask';

export const ConnectButton = () => {
  const { loading, connectToSnap, getWalletData } = useAvailSnap();

  // useEffect(() => {
  //   initSnap();
  // }, []);

  const handleConnect = async () => {
    try {
      await connectToSnap();
      // Handle successful connection
    } catch (error) {
      console.error('Failed to connect:', error);
      // Handle error in UI (e.g., show an error message)
    }
  };

  return (
    <Button
      className="px-4 py-2 text-white rounded-3xl"
      style={{
        background: 'linear-gradient(270deg, #2778E9 0%, #439FE7 100.18%)'
      }}
      onClick={handleConnect}
      disabled={loading}
    >
      {loading ? 'Connecting...' : 'Connect to Avail Snap'}{' '}
    </Button>
  );
};
