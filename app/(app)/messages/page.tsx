const CHATS = [
  { id: 1, name: 'Alex M.', last: 'Plec la 07:30, te aștept la benzinărie.', time: '09:12', unread: 2, trip: 'Târgoviște → București' },
  { id: 2, name: 'Maria P.', last: 'Mulțumesc pentru cursă! 🙌', time: 'Ieri', unread: 0, trip: 'București → Târgoviște' },
  { id: 3, name: 'Andrei D.', last: 'Mai ai un loc liber vineri?', time: 'Ieri', unread: 1, trip: 'Târgoviște → Ploiești' },
  { id: 4, name: 'Elena S.', last: 'Perfect, ne vedem acolo.', time: 'Luni', unread: 0, trip: 'Târgoviște → București' },
];

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2);
}

export default function MessagesPage() {
  return (
    <div className="py-6 space-y-5">
      <header>
        <h1 className="text-3xl font-black tracking-tight text-[#2C3E47]">Messages</h1>
        <p className="mt-1 text-sm text-[#2C3E47]/60">Conversațiile tale cu șoferii și pasagerii.</p>
      </header>

      {/* Căutare */}
      <div className="flex items-center gap-2 rounded-2xl bg-white border border-[#F8D7D3] px-4 py-3 shadow-sm focus-within:border-[#8CCBC4] transition-colors">
        <svg
          className="w-5 h-5 text-[#2C3E47]/40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="text"
          placeholder="Caută o conversație"
          className="w-full bg-transparent outline-none text-sm text-[#2C3E47] placeholder:text-[#2C3E47]/40"
        />
      </div>

      {/* Lista de conversații */}
      <ul className="rounded-3xl bg-white border border-[#F8D7D3] shadow-sm divide-y divide-[#F8D7D3] overflow-hidden">
        {CHATS.map((c) => (
          <li key={c.id}>
            <button className="w-full flex items-center gap-3 p-4 text-left transition-colors hover:bg-[#F8D7D3]/30 active:bg-[#F8D7D3]/50 cursor-pointer">
              <span className="shrink-0 w-12 h-12 rounded-full bg-[#8CCBC4] text-white font-black flex items-center justify-center">
                {initials(c.name)}
              </span>

              <span className="flex-1 min-w-0">
                <span className="flex items-baseline justify-between gap-2">
                  <span className={`truncate text-[#2C3E47] ${c.unread ? 'font-extrabold' : 'font-bold'}`}>
                    {c.name}
                  </span>
                  <span className="shrink-0 text-xs text-[#2C3E47]/50">{c.time}</span>
                </span>
                <span className="block text-[11px] font-semibold text-[#D9777F] truncate">{c.trip}</span>
                <span
                  className={`block text-sm truncate ${
                    c.unread ? 'text-[#2C3E47] font-semibold' : 'text-[#2C3E47]/60'
                  }`}
                >
                  {c.last}
                </span>
              </span>

              {c.unread > 0 && (
                <span className="shrink-0 min-w-6 h-6 px-1.5 rounded-full bg-[#D9777F] text-white text-xs font-black flex items-center justify-center">
                  {c.unread}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}