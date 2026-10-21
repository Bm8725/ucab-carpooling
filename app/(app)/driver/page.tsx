export default function DriverPage() {
  return (
    <div className="py-8 space-y-6">
      <header>
        <h1 className="text-3xl font-black tracking-tight">Driver Center</h1>
        <p className="mt-1 text-sm text-ucab-dark/60">Gestionează mașina și cursele oferite.</p>
      </header>

      <section className="rounded-3xl bg-white border border-ucab-pink p-6 shadow-sm space-y-4">
        <h2 className="font-extrabold text-lg">Mașina ta</h2>
        <p className="text-sm text-ucab-dark/60">Nu ai adăugat încă o mașină.</p>
        <button className="w-full sm:w-auto rounded-2xl bg-ucab-duckegg px-6 py-3 font-extrabold text-white shadow-md transition-all hover:brightness-95 active:scale-[0.98]">
          Adaugă mașină
        </button>
      </section>

      <section className="rounded-3xl bg-white border border-ucab-pink p-6 shadow-sm">
        <h2 className="font-extrabold text-lg">Curse oferite</h2>
        <p className="mt-1 text-sm text-ucab-dark/60">Nicio cursă publicată.</p>
      </section>
    </div>
  );
}