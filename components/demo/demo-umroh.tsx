"use client";

import {
  umrohFeatures,
  umrohItinerary,
  umrohPackages,
  umrohPaymentMethods,
} from "@/lib/umroh";
import {
  UmrohBookingSteps,
  UmrohCtaBanner,
  UmrohDetailHero,
  UmrohFaqSection,
  UmrohFeaturesGrid,
  UmrohHero,
  UmrohInclusionList,
  UmrohItineraryTimeline,
  UmrohPackageCard,
  UmrohPaymentMethods,
  UmrohPaymentSummary,
  UmrohSearchPanel,
  UmrohTestimonialCard,
} from "@/components/ui";

export function DemoUmroh() {
  const featuredPackage = umrohPackages[0];

  return (
    <section className="grid gap-8">
      <div className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-500">Umroh Website</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">
          Komponen untuk website travel umroh
        </h2>
        <p className="mt-3 text-sm leading-7 text-zinc-600">
          Section ini mencakup blok reusable untuk halaman home, listing paket,
          detail paket, payment, testimonial, FAQ, dan CTA akhir.
        </p>
      </div>

      <UmrohHero
        title="Berangkat Umroh dengan tenang, terarah, dan nyaman bersama tim berpengalaman."
        description="Paket umroh reguler, ramadhan, plus wisata halal, dan family package dengan pendampingan ibadah serta pembayaran fleksibel."
        image="https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=1600&q=80"
        stats={[
          { label: "Jamaah diberangkatkan", value: "12.500+" },
          { label: "Mitra hotel & maskapai", value: "40+" },
          { label: "Kepuasan jamaah", value: "4.9/5" },
        ]}
      />

      <UmrohSearchPanel />

      <div className="grid gap-5 xl:grid-cols-3">
        {umrohPackages.map((item) => (
          <UmrohPackageCard key={item.id} item={item} />
        ))}
      </div>

      <UmrohFeaturesGrid features={umrohFeatures} />

      <UmrohDetailHero item={featuredPackage} />

      <UmrohItineraryTimeline days={umrohItinerary} />

      <UmrohInclusionList
        included={[
          "Tiket pesawat PP",
          "Visa umroh",
          "Hotel Madinah & Makkah",
          "Makan 3x sehari",
          "Bus AC dan handling",
          "Muthawif berpengalaman",
        ]}
        excluded={[
          "Pembuatan paspor",
          "Kelebihan bagasi",
          "Keperluan pribadi",
          "Tour tambahan di luar paket",
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-6">
          <UmrohBookingSteps
            steps={[
              {
                title: "Pilih Paket",
                description: "Bandingkan tanggal keberangkatan, hotel, dan harga terbaik.",
              },
              {
                title: "Isi Data Jamaah",
                description: "Lengkapi data diri, dokumen, dan preferensi kamar.",
              },
              {
                title: "Bayar DP",
                description: "Lakukan pembayaran awal untuk mengunci seat keberangkatan.",
              },
              {
                title: "Manasik & Berangkat",
                description: "Ikuti manasik, pelunasan, dan briefing akhir sebelum berangkat.",
              },
            ]}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <UmrohTestimonialCard
              packageName="Umroh Executive Ramadhan"
              name="Bapak Ahmad, Bandung"
              quote="Pelayanan sangat rapi, hotel dekat, dan pembimbing ibadahnya sabar mendampingi lansia."
            />
            <UmrohTestimonialCard
              packageName="Umroh Plus Thaif Premium"
              name="Ibu Nurul, Surabaya"
              quote="Proses administrasi mudah dan update keberangkatan jelas dari awal sampai pulang."
            />
          </div>
        </div>

        <div className="grid gap-6">
          <UmrohPaymentSummary
            packageName={featuredPackage.title}
            basePrice="Rp 34.900.000"
            adminFee="Rp 250.000"
            total="Rp 35.150.000"
          />
          <UmrohPaymentMethods methods={umrohPaymentMethods} />
        </div>
      </div>

      <UmrohFaqSection
        items={[
          {
            question: "Apakah bisa daftar dengan DP dulu?",
            answer: "Bisa. Umumnya seat dikunci dengan DP sesuai syarat paket, lalu pelunasan mengikuti jadwal keberangkatan.",
          },
          {
            question: "Apakah ada pendamping untuk jamaah lansia?",
            answer: "Ya. Tim handling dan muthawif kami terbiasa mendampingi jamaah lansia serta family group.",
          },
          {
            question: "Dokumen apa saja yang perlu disiapkan?",
            answer: "Minimal paspor yang masih aktif, KTP, KK, buku nikah jika diperlukan, serta pas foto sesuai ketentuan visa.",
          },
        ]}
      />

      <UmrohCtaBanner
        title="Siap merencanakan perjalanan ibadah yang lebih tenang?"
        description="Tim travel consultant kami siap membantu memilih paket, simulasi biaya, dan jadwal keberangkatan terbaik untuk keluarga atau rombongan."
      />
    </section>
  );
}
