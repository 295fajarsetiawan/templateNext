export type UmrohPackage = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  duration: string;
  departure: string;
  airline: string;
  hotel: string;
  price: string;
  seatsLeft: number;
  badge?: string;
};

export type UmrohFeature = {
  id: string;
  title: string;
  description: string;
};

export type UmrohItineraryDay = {
  day: string;
  title: string;
  description: string;
};

export type UmrohPaymentMethod = {
  id: string;
  label: string;
  description: string;
  badge?: string;
};

export const umrohPackages: UmrohPackage[] = [
  {
    id: "um-1",
    title: "Umroh Executive Ramadhan",
    subtitle: "Madinah 5N / Makkah 5N",
    image:
      "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1400&q=80",
    duration: "12 Hari",
    departure: "10 Ramadhan 1448 H",
    airline: "Saudia Airlines",
    hotel: "Swissotel + Anwar Al Madinah",
    price: "Rp 34.900.000",
    seatsLeft: 8,
    badge: "Best Seller",
  },
  {
    id: "um-2",
    title: "Umroh Plus Thaif Premium",
    subtitle: "Ziarah lengkap + city tour",
    image:
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1400&q=80",
    duration: "13 Hari",
    departure: "22 Syawal 1448 H",
    airline: "Qatar Airways",
    hotel: "Pullman Zamzam + Saja Al Madinah",
    price: "Rp 32.750.000",
    seatsLeft: 12,
    badge: "Promo",
  },
  {
    id: "um-3",
    title: "Umroh Awal Musim Hemat",
    subtitle: "Paket family friendly",
    image:
      "https://images.unsplash.com/photo-1524499982521-1ffd58dd89ea?auto=format&fit=crop&w=1400&q=80",
    duration: "9 Hari",
    departure: "5 Muharram 1449 H",
    airline: "Garuda Indonesia",
    hotel: "Elaf Kinda + Al Aqeeq",
    price: "Rp 27.500.000",
    seatsLeft: 20,
  },
];

export const umrohFeatures: UmrohFeature[] = [
  {
    id: "guide",
    title: "Muthawif Berpengalaman",
    description: "Pendamping ibadah yang fokus pada kenyamanan dan bimbingan manasik.",
  },
  {
    id: "hotel",
    title: "Hotel Dekat Haram",
    description: "Pilihan hotel dengan akses nyaman untuk lansia dan keluarga.",
  },
  {
    id: "visa",
    title: "Visa dan Administrasi",
    description: "Tim operasional menangani proses dokumen dan update keberangkatan.",
  },
  {
    id: "payment",
    title: "Pembayaran Fleksibel",
    description: "Bisa DP, cicilan bertahap, atau pembayaran penuh sesuai jadwal.",
  },
];

export const umrohItinerary: UmrohItineraryDay[] = [
  {
    day: "Hari 1",
    title: "Keberangkatan dan Transit",
    description: "Briefing akhir, check-in, lalu penerbangan menuju Jeddah/Madinah.",
  },
  {
    day: "Hari 2",
    title: "Tiba di Madinah",
    description: "Check-in hotel, istirahat, dan ibadah di Masjid Nabawi.",
  },
  {
    day: "Hari 4",
    title: "City Tour Madinah",
    description: "Ziarah Raudhah, Uhud, Quba, dan kebun kurma sesuai jadwal grup.",
  },
  {
    day: "Hari 6",
    title: "Perjalanan ke Makkah",
    description: "Miqat, niat umroh, lalu check-in hotel dan pelaksanaan umroh pertama.",
  },
  {
    day: "Hari 9",
    title: "Ibadah Mandiri dan Kajian",
    description: "Waktu bebas terarah untuk ibadah, kajian, dan pendampingan jamaah.",
  },
  {
    day: "Hari 12",
    title: "Persiapan Pulang",
    description: "Checkout hotel, transfer bandara, dan penerbangan kembali ke Indonesia.",
  },
];

export const umrohPaymentMethods: UmrohPaymentMethod[] = [
  {
    id: "transfer",
    label: "Transfer Bank",
    description: "Pembayaran manual ke rekening resmi perusahaan.",
    badge: "Recommended",
  },
  {
    id: "va",
    label: "Virtual Account",
    description: "Verifikasi otomatis dan cocok untuk pembayaran bertahap.",
  },
  {
    id: "card",
    label: "Kartu Kredit",
    description: "Mendukung transaksi online dengan biaya gateway.",
  },
  {
    id: "office",
    label: "Bayar di Kantor",
    description: "Cocok untuk jamaah yang ingin konsultasi langsung.",
  },
];
