import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-5 py-10 bg-[#F8D7D3]/50">
      <Link href="/" className="group flex items-center gap-2 no-underline mb-6">
        <span className="w-11 h-11 rounded-xl bg-[#8CCBC4] text-white flex items-center justify-center font-black text-lg rotate-3 group-hover:rotate-0 transition-transform duration-300">
          U
        </span>
        <span className="text-3xl font-black tracking-tight text-[#2C3E47]">
          ucab<span className="text-[#8CCBC4]">.app</span>
        </span>
      </Link>

      <div className="w-full max-w-md rounded-3xl bg-white border border-[#F8D7D3] shadow-[0_20px_50px_-15px_rgba(44,62,71,0.3)] p-6 sm:p-8">
        {children}
      </div>
    </div>
  );
}