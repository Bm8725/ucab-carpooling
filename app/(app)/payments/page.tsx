const PAYMENTS = [
  { id: 1, label: 'Cursa Târgoviște → București', date: '14 oct', amount: '-25 lei' },
  { id: 2, label: 'Încărcare portofel', date: '10 oct', amount: '+100 lei' },
];

export default function PaymentsPage() {
  return (
    <div className="py-8 space-y-6">
      <header>
        <h1 className="text-3xl font-black tracking-tight">Payments</h1>
        <p className="mt-1 text-sm text-ucab-dark/60">Portofelul și istoricul plăților.</p>
      </header>

      <section className="rounded-3xl bg-ucab-duckegg text-white p-6 shadow-md">
        <p className="text-xs font-bold uppercase tracking-wider opacity-80">Sold</p>
        <p className="mt-1 text-4xl font-black">75 lei</p>
      </section>

      <ul className="rounded-3xl bg-white border border-ucab-pink shadow-sm divide-y divide-ucab-pink">
        {PAYMENTS.map((p) => (
          <li key={p.id} className="flex items-center justify-between p-4">
            <div>
              <p className="font-bold text-sm">{p.label}</p>
              <p className="text-xs text-ucab-dark/50">{p.date}</p>
            </div>
            <span className="font-extrabold text-sm">{p.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}