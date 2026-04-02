"use client";

import {
  umrohFeatures,
  umrohPackages,
} from "@/lib/umroh";
import {
  Button,
  UmrohCtaBanner,
  UmrohFeaturesGrid,
  UmrohHero,
  UmrohPackageCard,
  UmrohSearchPanel,
  UmrohTestimonialCard,
} from "@/components/ui";

export function UmrohHomePage() {
  return (
    <div className="grid gap-8">
      <UmrohHero
        title="Perjalanan ibadah umroh yang lebih tertata, nyaman, dan insyaAllah menenangkan."
        description="Pilih paket reguler, premium, atau family umroh dengan pendampingan manasik, hotel nyaman dekat haram, dan proses administrasi yang jelas dari awal."
        image="https://images.unsplash.com/photo-1513072064285-240f87fa81e8?auto=format&fit=crop&w=1600&q=80"
        stats={[
          { label: "Jamaah diberangkatkan", value: "12.500+" },
          { label: "Keberangkatan aktif", value: "24 Jadwal" },
          { label: "Pendamping ibadah", value: "35 Ustadz" },
        ]}
      />

      <UmrohSearchPanel />

      <section className="grid gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">Paket Unggulan</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950">
              Pilihan paket umroh paling diminati
            </h2>
          </div>
          <Button variant="secondary">Lihat Semua Paket</Button>
        </div>
        <div className="grid gap-5 xl:grid-cols-3">
          {umrohPackages.map((item) => (
            <UmrohPackageCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="grid gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">Kenapa Kami</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950">
            Travel partner untuk ibadah yang lebih terarah
          </h2>
        </div>
        <UmrohFeaturesGrid features={umrohFeatures} />
      </section>

      <section className="grid gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">Testimoni</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950">
            Cerita jamaah setelah perjalanan
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <UmrohTestimonialCard
            packageName="Umroh Executive Ramadhan"
            name="Bapak Ahmad, Bandung"
            quote="Hotel dekat, muthawif sabar, dan semua tim komunikatif dari sebelum berangkat sampai pulang."
          />
          <UmrohTestimonialCard
            packageName="Umroh Family Premium"
            name="Ibu Sari, Bekasi"
            quote="Sangat membantu untuk keluarga yang membawa orang tua. Jadwal nyaman dan pelayanan rapi."
          />
          <UmrohTestimonialCard
            packageName="Umroh Plus Thaif"
            name="Bapak Zaki, Surabaya"
            quote="Administrasi jelas, pembayaran bertahap enak, dan city tour berjalan sesuai ekspektasi."
          />
        </div>
      </section>

      <UmrohCtaBanner
        title="Diskusikan paket terbaik untuk keluarga, komunitas, atau keberangkatan pribadi."
        description="Tim konsultan siap membantu simulasi biaya, jadwal keberangkatan, pilihan hotel, dan kebutuhan khusus jamaah."
      />
    </div>
  );
}
