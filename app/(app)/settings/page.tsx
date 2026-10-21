const SECTIONS = [
  { title: 'Profil', text: 'Nume, email, telefon' },
  { title: 'Notificări', text: 'Alerte pentru curse și plăți' },
  { title: 'Securitate', text: 'Parolă și autentificare' },
];

export default function SettingsPage() {
  return (
    <div className="py-8 space-y-6">
      <header>
        <h1 className="text-3xl font-black tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-ucab-dark/60">Preferințele contului tău.</p>
      </header>

      <ul className="rounded-3xl bg-white border border-ucab-pink shadow-sm divide-y divide-ucab-pink">
        {SECTIONS.map((s) => (
          <li key={s.title}>
            <button className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-ucab-pink/30 first:rounded-t-3xl last:rounded-b-3xl">
              <span>
                <span className="block font-bold">{s.title}</span>
                <span className="block text-sm text-ucab-dark/60">{s.text}</span>
              </span>
              <span className="text-ucab-dark/30">›</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}