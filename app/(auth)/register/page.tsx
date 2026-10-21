'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const input =
  'w-full rounded-2xl bg-white border border-[#F8D7D3] px-4 py-3 text-sm font-semibold text-[#2C3E47] placeholder:text-[#2C3E47]/40 outline-none focus:border-[#8CCBC4] focus:ring-2 focus:ring-[#8CCBC4]/30 transition';
const label = 'block text-[11px] font-bold uppercase tracking-wider text-[#2C3E47]/50 mb-1.5';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<'passenger' | 'driver'>('passenger');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return setError('Scrie numele tău.');
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Email invalid.');
    if (!/^[0-9+\s]{9,15}$/.test(phone.trim())) return setError('Număr de telefon invalid.');
    if (password.length < 6) return setError('Parola are minim 6 caractere.');
    if (!terms) return setError('Trebuie să accepți termenii.');
    setError('');
    setLoading(true);

    // TEMPORAR: aici va veni apelul către server/DB
    await new Promise((r) => setTimeout(r, 700));
    try {
      localStorage.setItem('ucab_user', JSON.stringify({ name, email, phone, role }));
    } catch {}
    router.push('/');
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-[#2C3E47]">Creează cont</h1>
        <p className="mt-1 text-sm text-[#2C3E47]/60">Durează sub un minut.</p>
      </div>

      <div className="grid grid-cols-2 gap-1.5 rounded-2xl bg-[#F8D7D3]/50 p-1.5">
        {([['passenger', 'Pasager'], ['driver', 'Șofer']] as const).map(([k, t]) => (
          <button
            key={k}
            type="button"
            onClick={() => setRole(k)}
            className={`py-2.5 rounded-xl text-sm font-extrabold transition cursor-pointer ${
              role === k ? 'bg-white text-[#2C3E47] shadow-sm' : 'text-[#2C3E47]/60'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div>
        <label className={label}>Nume complet</label>
        <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Ion Popescu" className={input} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={label}>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="nume@email.com" className={input} />
        </div>
        <div>
          <label className={label}>Telefon</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" autoComplete="tel" placeholder="07xx xxx xxx" className={input} />
        </div>
      </div>

      <div>
        <label className={label}>Parolă</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" placeholder="minim 6 caractere" className={input} />
      </div>

      <label className="flex items-start gap-2.5 text-sm text-[#2C3E47]/70 cursor-pointer">
        <input
          type="checkbox"
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-[#D9777F]"
        />
        Accept termenii și condițiile și politica de confidențialitate.
      </label>

      {error && <p className="text-sm font-bold text-[#D9777F]">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-2xl bg-[#8CCBC4] text-white font-extrabold shadow-md transition-all hover:brightness-95 active:scale-[0.98] disabled:opacity-60 cursor-pointer"
      >
        {loading ? 'Se creează contul…' : 'Creează cont'}
      </button>

      <p className="text-center text-sm text-[#2C3E47]/60">
        Ai deja cont?{' '}
        <Link href="/login" className="font-extrabold text-[#D9777F] no-underline hover:underline">
          Intră în cont
        </Link>
      </p>
    </form>
  );
}