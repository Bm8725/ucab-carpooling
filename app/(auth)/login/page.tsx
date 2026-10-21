'use client';

import { useState } from 'react';
import Link from 'next/link';

const input =
  'w-full rounded-2xl bg-white border border-[#F8D7D3] px-4 py-3 text-sm font-semibold text-[#2C3E47] placeholder:text-[#2C3E47]/40 outline-none focus:border-[#8CCBC4] focus:ring-2 focus:ring-[#8CCBC4]/30 transition';
const label = 'block text-[11px] font-bold uppercase tracking-wider text-[#2C3E47]/50 mb-1.5';
const social =
  'w-full flex items-center justify-center gap-3 rounded-2xl border py-3 text-sm font-extrabold transition-all active:scale-[0.98] hover:-translate-y-0.5 cursor-pointer';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Email invalid.');
    if (password.length < 6) return setError('Parola are minim 6 caractere.');
    setError('');
    // TODO: backend
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-[#2C3E47]">Bine ai revenit</h1>
        <p className="mt-1 text-sm text-[#2C3E47]/60">Intră în cont ca să-ți vezi cursele.</p>
      </div>

      <div className="space-y-3">
        {/* TODO: Google */}
        <button type="button" className={`${social} bg-white border-[#2C3E47]/15 text-[#2C3E47]`}>
          <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continuă cu Google
        </button>

        {/* TODO: Apple */}
        <button type="button" className={`${social} bg-black border-black text-white`}>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
          </svg>
          Continuă cu Apple
        </button>

        <div className="flex items-center gap-3 pt-1">
          <span className="h-px flex-1 bg-[#2C3E47]/10" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#2C3E47]/40">sau cu email</span>
          <span className="h-px flex-1 bg-[#2C3E47]/10" />
        </div>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className={label}>Email</label>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nume@email.com"
            className={input}
          />
        </div>

        <div>
          <label className={label}>Parolă</label>
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={input + ' pr-16'}
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-extrabold text-[#D9777F] cursor-pointer"
            >
              {show ? 'Ascunde' : 'Arată'}
            </button>
          </div>
        </div>

        {error && <p className="text-sm font-bold text-[#D9777F]">{error}</p>}

        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-[#8CCBC4] text-white font-extrabold shadow-md transition-all hover:brightness-95 active:scale-[0.98] cursor-pointer"
        >
          Intră în cont
        </button>
      </form>

      <p className="text-center text-sm text-[#2C3E47]/60">
        Nu ai cont?{' '}
        <Link href="/register" className="font-extrabold text-[#D9777F] no-underline hover:underline">
          Creează unul
        </Link>
      </p>
    </div>
  );
}