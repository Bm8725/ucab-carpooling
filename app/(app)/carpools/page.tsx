const CARPOOLS = [
  { id: 1, route: 'Târgoviște → București', time: 'Luni, 07:30', seats: 2, price: '25 lei' },
  { id: 2, route: 'București → Târgoviște', time: 'Vineri, 17:45', seats: 3, price: '25 lei' },
];

export default function CarpoolsPage() {
  return (
    <div className="py-8 space-y-6">
      <header>
        <h1 className="text-3xl font-black tracking-tight">My Carpools</h1>
        <p className="mt-1 text-sm text-ucab-dark/60">Traseele tale active.</p>
      </header>

      <ul className="space-y-3">
        {CARPOOLS.map((c) => (
          <li
            key={c.id}
            className="rounded-3xl bg-white border border-ucab-pink p-5 shadow-sm flex items-center justify-between gap-4"
          >
            <div>
              <p className="font-extrabold">{c.route}</p>
              <p className="text-sm text-ucab-dark/60">
                {c.time} · {c.seats} locuri libere
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-ucab-duckegg px-4 py-1.5 text-sm font-bold text-white">
              {c.price}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}