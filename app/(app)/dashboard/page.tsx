const STATS = [
  { label: 'Curse luna asta', value: '12' },
  { label: 'Economisit', value: '240 lei' },
  { label: 'Rating', value: '4.9' },
];

export default function DashboardPage() {
  return (
    <div className="py-8 space-y-8">
      <header>
        <h1 className="text-3xl font-black tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-ucab-dark/60">Rezumatul activității tale.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-3xl bg-white border border-ucab-pink p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-ucab-dark/50">{s.label}</p>
            <p className="mt-2 text-3xl font-black text-ucab-duckegg">{s.value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl bg-white border border-ucab-pink p-6 shadow-sm">
        <h2 className="font-extrabold text-lg">Următoarea cursă</h2>
        <p className="mt-1 text-sm text-ucab-dark/60">Nu ai nicio cursă programată.</p>
      </section>
    </div>
  );
}