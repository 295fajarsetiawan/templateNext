export default function UmrohLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fcfcfb_0%,#f6f8f3_100%)]">
      <header className="sticky top-0 z-30 border-b border-emerald-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">Travel Umroh</p>
            <h1 className="text-lg font-bold tracking-tight text-zinc-950">Barakah Journey</h1>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-600 md:flex">
            <a href="#paket" className="transition hover:text-zinc-950">Paket</a>
            <a href="#keunggulan" className="transition hover:text-zinc-950">Keunggulan</a>
            <a href="#testimoni" className="transition hover:text-zinc-950">Testimoni</a>
            <a href="#kontak" className="transition hover:text-zinc-950">Kontak</a>
          </nav>
          <a
            href="#booking"
            className="rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            Konsultasi
          </a>
        </div>
      </header>

      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {children}
      </div>

      <footer className="border-t border-emerald-100 bg-white">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">Barakah Journey</p>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-500">
              Travel umroh dengan pendekatan pelayanan yang rapi, manasik terarah,
              dan komunikasi yang jelas untuk jamaah, keluarga, dan rombongan.
            </p>
          </div>
          <div className="grid gap-2 text-sm text-zinc-500">
            <p>Office: Jakarta Selatan</p>
            <p>WhatsApp: +62 812 0000 0000</p>
            <p>Email: info@barakahjourney.co.id</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
