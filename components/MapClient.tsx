'use client';

import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('./MapView'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#EFE9DC] animate-pulse" />,
});

export default function MapClient() {
  return <MapView />;
}