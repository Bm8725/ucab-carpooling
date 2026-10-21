'use client';

import { useEffect, useMemo, useState } from 'react';
import MapClient from '@/components/MapClient';

const CITIES = ['Târgoviște', 'București', 'Ploiești', 'Pitești', 'Brașov', 'Sinaia', 'Cluj-Napoca'];

const DRIVERS = [
  { id: 1, name: 'Alex M.', rating: 4.9, car: 'Dacia Logan · gri', time: '07:30', price: 25, seats: 3 },
  { id: 2, name: 'Maria P.', rating: 4.8, car: 'VW Golf · albastru', time: '09:00', price: 28, seats: 2 },
  { id: 3, name: 'Andrei D.', rating: 4.7, car: 'Renault Zoe · electric', time: '17:45', price: 22, seats: 4 },
];

type Ride = (typeof DRIVERS)[number];
type Step = 'search' | 'results' | 'booking' | 'done';

const input =
  'w-full rounded-2xl bg-white border border-[#F8D7D3] px-4 py-3 text-sm font-semibold text-[#2C3E47] placeholder:text-[#2C3E47]/40 outline-none focus:border-[#8CCBC4] focus:ring-2 focus:ring-[#8CCBC4]/30 transition';
const label = 'block text-[11px] font-bold uppercase tracking-wider text-[#2C3E47]/50 mb-1.5';
const primary =
  'w-full py-3.5 rounded-2xl bg-[#8CCBC4] text-white font-extrabold text-center shadow-md transition-all hover:brightness-95 active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

function Toggle({ on, onChange, text }: { on: boolean; onChange: (v: boolean) => void; text: string }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm font-bold transition cursor-pointer ${
        on ? 'bg-[#F8D7D3] border-[#D9777F] text-[#2C3E47]' : 'bg-white border-[#F8D7D3] text-[#2C3E47]/60'
      }`}
    >
      {text}
      <span className={`w-9 h-5 rounded-full p-0.5 transition ${on ? 'bg-[#D9777F]' : 'bg-[#2C3E47]/20'}`}>
        <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${on ? 'translate-x-4' : ''}`} />
      </span>
    </button>
  );
}

export default function Home() {
  const [step, setStep] = useState<Step>('search');

  // căutare
  const [from, setFrom] = useState('Târgoviște');
  const [to, setTo] = useState('București');
  const [date, setDate] = useState('');
  const [minDate, setMinDate] = useState('');
  const [time, setTime] = useState('07:00');
  const [passengers, setPassengers] = useState(1);
  const [pets, setPets] = useState(false);
  const [carSeat, setCarSeat] = useState(false);
  const [luggage, setLuggage] = useState(false);
  const [error, setError] = useState('');

  // rezervare
  const [ride, setRide] = useState<Ride | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [pay, setPay] = useState<'card' | 'cash' | 'wallet'>('card');
  const [code, setCode] = useState('');

  useEffect(() => {
    const t = new Date();
    const iso = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
    setMinDate(iso);
    setDate(iso);
  }, []);

  const results = useMemo(
    () => DRIVERS.filter((d) => d.seats >= passengers && d.time >= time),
    [passengers, time]
  );

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const search = () => {
    if (!from.trim() || !to.trim()) return setError('Completează locul de plecare și destinația.');
    if (from.trim().toLowerCase() === to.trim().toLowerCase())
      return setError('Plecarea și destinația nu pot fi la fel.');
    if (!date || date < minDate) return setError('Alege o dată validă.');
    setError('');
    setStep('results');
  };

  const total = ride ? ride.price * passengers : 0;

  const confirm = () => {
    if (name.trim().length < 2) return setError('Scrie numele tău.');
    if (!/^[0-9+\s]{9,15}$/.test(phone.trim())) return setError('Număr de telefon invalid.');
    setError('');
    setCode('UC-' + Date.now().toString(36).toUpperCase().slice(-6));
    setStep('done');
  };

  const reset = () => {
    setStep('search');
    setRide(null);
    setNote('');
    setError('');
  };

  return (
    <div className="py-5 md:py-8 grid gap-5 lg:grid-cols-[440px_1fr] items-start">
      {/* ───── PANOU ───── */}
      <div className="order-2 lg:order-1 rounded-3xl bg-white/80 border border-[#F8D7D3] shadow-sm p-5 space-y-4">
        {/* progres */}
        <div className="flex gap-1.5">
          {(['search', 'results', 'booking', 'done'] as Step[]).map((s, i) => (
            <span
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i <= ['search', 'results', 'booking', 'done'].indexOf(step) ? 'bg-[#D9777F]' : 'bg-[#F8D7D3]'
              }`}
            />
          ))}
        </div>

        {/* 1. CĂUTARE */}
        {step === 'search' && (
          <>
            <h1 className="text-2xl font-black tracking-tight text-[#2C3E47]">Unde mergi azi?</h1>

            <div className="relative space-y-3">
              <div>
                <label className={label}>Plecare</label>
                <input list="cities" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Oraș sau adresă" className={input} />
              </div>
              <button
                type="button"
                onClick={swap}
                aria-label="Inversează"
                className="absolute right-3 top-[52%] -translate-y-1/2 w-9 h-9 rounded-full bg-[#2C3E47] text-white flex items-center justify-center shadow-md active:rotate-180 transition-transform duration-300 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M7 4v16M7 20l-3-3M7 20l3-3M17 20V4M17 4l-3 3M17 4l3 3" />
                </svg>
              </button>
              <div>
                <label className={label}>Destinație</label>
                <input list="cities" value={to} onChange={(e) => setTo(e.target.value)} placeholder="Oraș sau adresă" className={input} />
              </div>
              <datalist id="cities">
                {CITIES.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={label}>Data</label>
                <input type="date" value={date} min={minDate} onChange={(e) => setDate(e.target.value)} className={input} />
              </div>
              <div>
                <label className={label}>Ora (după)</label>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={input} />
              </div>
            </div>

            <div>
              <label className={label}>Pasageri</label>
              <div className="flex items-center justify-between rounded-2xl bg-white border border-[#F8D7D3] p-1.5">
                {[1, 2, 3, 4].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPassengers(n)}
                    className={`flex-1 py-2 rounded-xl text-sm font-extrabold transition cursor-pointer ${
                      passengers === n ? 'bg-[#8CCBC4] text-white shadow-sm' : 'text-[#2C3E47]/60 hover:bg-[#F8D7D3]/50'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-2">
              <Toggle on={pets} onChange={setPets} text="Animale" />
              <Toggle on={carSeat} onChange={setCarSeat} text="Scaun copil" />
              <Toggle on={luggage} onChange={setLuggage} text="Bagaj mare" />
            </div>

            {error && <p className="text-sm font-bold text-[#D9777F]">{error}</p>}
            <button onClick={search} className={primary}>
              Caută curse
            </button>
          </>
        )}

        {/* 2. REZULTATE */}
        {step === 'results' && (
          <>
            <button onClick={() => setStep('search')} className="text-sm font-bold text-[#2C3E47]/60 hover:text-[#2C3E47] cursor-pointer">
              ← Modifică căutarea
            </button>
            <div>
              <h2 className="text-xl font-black text-[#2C3E47]">
                {from} → {to}
              </h2>
              <p className="text-sm text-[#2C3E47]/60">
                {date} · după {time} · {passengers} {passengers === 1 ? 'pasager' : 'pasageri'}
              </p>
            </div>

            {results.length === 0 ? (
              <p className="rounded-2xl bg-[#F8D7D3]/40 p-4 text-sm font-semibold text-[#2C3E47]/70">
                Nicio cursă disponibilă. Încearcă o oră mai devreme sau mai puțini pasageri.
              </p>
            ) : (
              <ul className="space-y-3">
                {results.map((d) => (
                  <li key={d.id}>
                    <button
                      onClick={() => {
                        setRide(d);
                        setStep('booking');
                      }}
                      className="w-full text-left rounded-2xl bg-white border border-[#F8D7D3] p-4 flex items-center gap-3 shadow-sm hover:border-[#8CCBC4] hover:-translate-y-0.5 transition-all cursor-pointer"
                    >
                      <span className="w-11 h-11 shrink-0 rounded-full bg-[#8CCBC4] text-white font-black flex items-center justify-center">
                        {d.name.slice(0, 1)}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block font-extrabold text-[#2C3E47]">
                          {d.time} · {d.name} <span className="text-[#D9777F] text-sm">{d.rating} ★</span>
                        </span>
                        <span className="block text-xs text-[#2C3E47]/60 truncate">
                          {d.car} · {d.seats} locuri libere
                        </span>
                      </span>
                      <span className="shrink-0 text-right">
                        <span className="block text-lg font-black text-[#2C3E47]">{d.price} lei</span>
                        <span className="block text-[10px] text-[#2C3E47]/50">/ persoană</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {/* 3. REZERVARE */}
        {step === 'booking' && ride && (
          <>
            <button onClick={() => setStep('results')} className="text-sm font-bold text-[#2C3E47]/60 hover:text-[#2C3E47] cursor-pointer">
              ← Înapoi la curse
            </button>
            <h2 className="text-xl font-black text-[#2C3E47]">Rezervare</h2>

            <div className="rounded-2xl bg-[#F8D7D3]/40 p-4 text-sm space-y-1 text-[#2C3E47]">
              <p className="font-extrabold">
                {from} → {to}
              </p>
              <p className="text-[#2C3E47]/70">
                {date}, {ride.time} · {ride.name} · {ride.car}
              </p>
              <p className="text-[#2C3E47]/70">
                {passengers} {passengers === 1 ? 'loc' : 'locuri'}
                {pets && ' · animale'}
                {carSeat && ' · scaun copil'}
                {luggage && ' · bagaj mare'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={label}>Nume</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ion Popescu" className={input} />
              </div>
              <div>
                <label className={label}>Telefon</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="07xx xxx xxx" inputMode="tel" className={input} />
              </div>
            </div>

            <div>
              <label className={label}>Mesaj pentru șofer (opțional)</label>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="Ex: am un rucsac mare" className={input + ' resize-none'} />
            </div>

            <div>
              <label className={label}>Metodă de plată</label>
              <div className="grid grid-cols-3 gap-2">
                {([['card', 'Card'], ['cash', 'Cash'], ['wallet', 'Portofel']] as const).map(([k, t]) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setPay(k)}
                    className={`py-2.5 rounded-xl text-sm font-extrabold border transition cursor-pointer ${
                      pay === k ? 'bg-[#F8D7D3] border-[#D9777F] text-[#2C3E47]' : 'bg-white border-[#F8D7D3] text-[#2C3E47]/60'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-[#2C3E47] text-white px-4 py-3">
              <span className="text-sm font-semibold text-white/70">
                {ride.price} lei × {passengers}
              </span>
              <span className="text-xl font-black">{total} lei</span>
            </div>

            {error && <p className="text-sm font-bold text-[#D9777F]">{error}</p>}
            <button onClick={confirm} className={primary}>
              Confirmă rezervarea
            </button>
          </>
        )}

        {/* 4. CONFIRMARE */}
        {step === 'done' && ride && (
          <div className="text-center space-y-4 py-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-[#8CCBC4] text-white flex items-center justify-center animate-bounce [animation-iteration-count:2]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="m5 12 5 5 9-10" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-[#2C3E47]">Rezervare trimisă!</h2>
            <p className="text-sm text-[#2C3E47]/70">
              {from} → {to}
              <br />
              {date}, {ride.time} · {ride.name}
              <br />
              Total: <b>{total} lei</b> ({pay === 'card' ? 'card' : pay === 'cash' ? 'cash' : 'portofel'})
            </p>
            <p className="inline-block rounded-xl bg-[#F8D7D3] px-4 py-2 font-black tracking-widest text-[#2C3E47]">{code}</p>
            <button onClick={reset} className={primary}>
              Caută altă cursă
            </button>
          </div>
        )}
      </div>

      {/* ───── HARTA ───── */}
      <div className="order-1 lg:order-2 isolate relative h-[280px] sm:h-[360px] lg:h-[calc(100dvh-72px-4rem)] lg:sticky lg:top-24 rounded-[2rem] overflow-hidden border-4 border-white shadow-[0_20px_50px_-15px_rgba(44,62,71,0.35)]">
        <MapClient />
      </div>
    </div>
  );
}