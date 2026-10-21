import Navbar from '@/components/Navbar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col w-full max-w-7xl mx-auto px-5 sm:px-8 pb-28 md:pb-10">
        {children}
      </main>
    </div>
  );
}