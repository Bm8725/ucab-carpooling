'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

const svg = {
  className: 'w-[22px] h-[22px]',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  viewBox: '0 0 24 24',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

type Item = { href: string; label: string; icon: ReactNode; mobile?: boolean };

const ITEMS: Item[] = [
  {
    href: '/',
    label: 'Home',
    mobile: true,
    icon: (
      <svg {...svg}>
        <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5z" />
      </svg>
    ),
  },
  {
    href: '/search',
    label: 'Search',
    icon: (
      <svg {...svg}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    ),
  },
  {
    href: '/carpools',
    label: 'Trips',
    mobile: true,
    icon: (
      <svg {...svg}>
        <path d="M5 16V11l1.6-4.2A2 2 0 0 1 8.5 5.5h7a2 2 0 0 1 1.9 1.3L19 11v5M5 16h14M5 16v2.5M19 16v2.5" />
      </svg>
    ),
  },
  {
    href: '/messages',
    label: 'Messages',
    mobile: true,
    icon: (
      <svg {...svg}>
        <path d="M21 12a8 8 0 0 1-11.8 7L4 20l1.1-4.4A8 8 0 1 1 21 12z" />
      </svg>
    ),
  },
  {
    href: '/settings',
    label: 'Profile',
    mobile: true,
    icon: (
      <svg {...svg}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </svg>
    ),
  },
];

function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2 no-underline">
      <span className="w-9 h-9 rounded-xl bg-[#8CCBC4] text-white flex items-center justify-center font-black rotate-3 group-hover:rotate-0 group-active:scale-90 transition-transform duration-300">
        U
      </span>
      <span className="text-xl font-black tracking-tight text-[#2C3E47]">
        ucab<span className="text-[#8CCBC4]">.app</span>
      </span>
    </Link>
  );
}

function Avatar({ size = 'w-10 h-10' }: { size?: string }) {
  return (
    <div
      className={`${size} rounded-full bg-white border-2 border-[#8CCBC4] flex items-center justify-center text-xs font-black text-[#2C3E47] hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer`}
    >
      AM
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      {/* DESKTOP: bară roz sus */}
      <header className="hidden md:block sticky top-0 z-50 bg-[#F8D7D3]/90 backdrop-blur-md border-b border-[#2C3E47]/10">
        <nav className="max-w-7xl mx-auto h-[72px] px-8 flex items-center justify-between">
          <Logo />
          <ul className="flex items-center gap-1">
            {ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block px-4 py-2 rounded-full text-sm font-bold no-underline transition-all duration-200 active:scale-95 ${
                    isActive(item.href)
                      ? 'bg-white text-[#2C3E47] shadow-sm'
                      : 'text-[#2C3E47]/70 hover:bg-white/60 hover:-translate-y-0.5'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Avatar />
        </nav>
      </header>

      {/* MOBIL: header roz sus */}
      <header className="md:hidden sticky top-0 z-40 bg-[#F8D7D3]/90 backdrop-blur-md border-b border-[#2C3E47]/10">
        <div className="h-14 px-4 flex items-center justify-between">
          <Logo />
          <Avatar size="w-9 h-9" />
        </div>
      </header>

      {/* MOBIL: bară lipită de fund, 4 taburi */}
      <nav
        aria-label="Navigare principală"
        className="md:hidden bg-[#F6F1E7]/95 backdrop-blur-md border-t border-[#2C3E47]/15"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <ul className="grid grid-cols-4">
          {ITEMS.filter((item) => item.mobile).map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative flex flex-col items-center gap-0.5 pt-2.5 pb-2 no-underline transition-colors duration-300 active:scale-90 ${
                    active ? 'text-[#D9777F]' : 'text-[#2C3E47]/55'
                  }`}
                >
                  {/* linie animată sus */}
                  <span
                    className={`absolute top-0 left-1/2 -translate-x-1/2 h-[3px] w-10 rounded-b-full bg-[#D9777F] origin-center transition-transform duration-300 ${
                      active ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                  {/* iconiță cu bule roz în spate */}
                  <span
                    className={`flex items-center justify-center w-12 h-7 rounded-full transition-all duration-300 ${
                      active
                        ? 'bg-[#F8D7D3] -translate-y-0.5 scale-110'
                        : 'bg-transparent'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span
                    className={`text-[11px] transition-all duration-300 ${
                      active ? 'font-extrabold' : 'font-semibold'
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}