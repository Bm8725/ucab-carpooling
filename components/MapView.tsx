'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';

type Pt = [number, number]; // [lng, lat]
type Gps = 'idle' | 'loading' | 'on' | 'error';

const START: Pt = [25.4567, 44.9254]; // Târgoviște
const END: Pt = [26.1025, 44.4268]; // București

function dot(color: string) {
  const el = document.createElement('div');
  el.style.cssText = `width:26px;height:26px;border-radius:50%;background:${color};border:4px solid #fff;box-shadow:0 4px 12px rgba(0,0,0,.3)`;
  return el;
}

function car() {
  const el = document.createElement('div');
  el.textContent = '🚗';
  el.style.cssText =
    'width:40px;height:40px;border-radius:50%;background:#2C3E47;border:3px solid #fff;box-shadow:0 6px 16px rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center;font-size:20px';
  return el;
}

export default function MapView() {
  const box = useRef<HTMLDivElement>(null);
  const geoRef = useRef<mapboxgl.GeolocateControl | null>(null);
  const [gps, setGps] = useState<Gps>('idle');

  useEffect(() => {
    if (!box.current) return;

    const map = new mapboxgl.Map({
      container: box.current,
      style: 'mapbox://styles/mapbox/light-v11',
      bounds: [START, END],
      fitBoundsOptions: { padding: 60 },
      attributionControl: false,
    });
    map.scrollZoom.disable();

    // GPS: controlul Mapbox face tot (punct albastru, direcție, precizie)
    const geo = new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
      showUserHeading: true,
      showAccuracyCircle: true,
      fitBoundsOptions: { maxZoom: 15 },
    });
    map.addControl(geo, 'top-right');
    geoRef.current = geo;
    geo.on('geolocate', () => setGps('on'));
    geo.on('error', () => setGps('error'));

    new mapboxgl.Marker({ element: dot('#8CCBC4') }).setLngLat(START).addTo(map);
    new mapboxgl.Marker({ element: dot('#D9777F') }).setLngLat(END).addTo(map);
    const carMarker = new mapboxgl.Marker({ element: car() }).setLngLat(START).addTo(map);

    let coords: Pt[] = [START, END];
    let raf = 0;
    let cancelled = false;

    const animate = (t: number) => {
      const p = (t % 12000) / 12000;
      const idx = Math.floor(p * (coords.length - 1));
      carMarker.setLngLat(coords[idx]);
      raf = requestAnimationFrame(animate);
    };

    map.on('load', async () => {
      try {
        const res = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${START.join(',')};${END.join(',')}?geometries=geojson&overview=full&access_token=${mapboxgl.accessToken}`
        );
        const data = await res.json();
        coords = data.routes[0].geometry.coordinates;
      } catch {}
      if (cancelled) return;

      map.addSource('route', {
        type: 'geojson',
        data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: coords } },
      });
      map.addLayer({
        id: 'route-casing',
        type: 'line',
        source: 'route',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': '#ffffff', 'line-width': 11 },
      });
      map.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': '#D9777F', 'line-width': 6 },
      });

      raf = requestAnimationFrame(animate);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      map.remove();
    };
  }, []);

  const locate = () => {
    setGps('loading');
    geoRef.current?.trigger();
  };

  const label =
    gps === 'loading' ? 'Caut…' : gps === 'on' ? 'Ești aici' : gps === 'error' ? 'GPS blocat' : 'Locația mea';

  return (
    <div className="relative w-full h-full">
      {/* ascund butonul standard Mapbox, folosim al nostru */}
      <style>{`.mapboxgl-ctrl-top-right{display:none}`}</style>

      <div ref={box} className="w-full h-full" />

      <button
        onClick={locate}
        className={`absolute top-3 right-3 sm:top-5 sm:right-5 z-10 flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-extrabold shadow-lg transition-all active:scale-95 cursor-pointer ${
          gps === 'on'
            ? 'bg-[#8CCBC4] text-white'
            : gps === 'error'
            ? 'bg-[#D9777F] text-white'
            : 'bg-white text-[#2C3E47] hover:-translate-y-0.5'
        }`}
      >
        <svg
          className={`w-4 h-4 ${gps === 'loading' ? 'animate-spin' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        </svg>
        {label}
      </button>

      {gps === 'error' && (
        <p className="absolute top-16 right-3 sm:right-5 z-10 max-w-[220px] rounded-xl bg-white/95 px-3 py-2 text-xs font-semibold text-[#2C3E47] shadow-lg">
          Permite accesul la locație în setările browserului și încearcă din nou.
        </p>
      )}
    </div>
  );
}