"use client";

import { useState } from "react";

import type {
  UmrohFeature,
  UmrohItineraryDay,
  UmrohPackage,
  UmrohPaymentMethod,
} from "@/lib/umroh";
import { cn } from "@/lib/cn";
import { Badge, Button, Card } from "@/components/ui";

type UmrohHeroProps = {
  title: string;
  description: string;
  image: string;
  stats?: Array<{ label: string; value: string }>;
  className?: string;
};

export function UmrohHero({ title, description, image, stats = [], className }: UmrohHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[2.4rem] px-6 py-10 text-white shadow-[0_30px_80px_rgba(15,23,42,0.18)] sm:px-10 sm:py-14",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(110deg, rgba(3,37,65,0.88), rgba(6,95,70,0.62)), url('${image}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.26em] text-emerald-200">Travel Umroh</p>
        <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-white/85">{description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button className="bg-white text-emerald-900 hover:bg-emerald-50">Lihat Paket</Button>
          <Button variant="secondary" className="border-white/20 bg-white/10 text-white hover:bg-white/15">
            Konsultasi Ustadz
          </Button>
        </div>
      </div>

      {stats.length > 0 ? (
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[1.6rem] border border-white/15 bg-white/10 px-4 py-4 backdrop-blur-sm">
              <p className="text-sm text-white/75">{stat.label}</p>
              <p className="mt-2 text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}

type UmrohSearchPanelProps = {
  className?: string;
};

export function UmrohSearchPanel({ className }: UmrohSearchPanelProps) {
  return (
    <section className={cn("grid gap-4 rounded-[2rem] border border-zinc-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] lg:grid-cols-[1.1fr_1fr_1fr_auto]", className)}>
      <input className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none" placeholder="Cari paket umroh..." />
      <select className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none">
        <option>Semua bulan</option>
        <option>Ramadhan</option>
        <option>Syawal</option>
        <option>Muharram</option>
      </select>
      <select className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none">
        <option>Semua budget</option>
        <option>Under 30 Juta</option>
        <option>30-35 Juta</option>
        <option>Above 35 Juta</option>
      </select>
      <Button className="w-full lg:w-auto">Cari Sekarang</Button>
    </section>
  );
}

type UmrohPackageCardProps = {
  item: UmrohPackage;
  className?: string;
};

export function UmrohPackageCard({ item, className }: UmrohPackageCardProps) {
  return (
    <article className={cn("overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)]", className)}>
      <div
        className="relative h-56 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0.08), rgba(15,23,42,0.45)), url('${item.image}')`,
        }}
      >
        {item.badge ? (
          <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
            {item.badge}
          </span>
        ) : null}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 text-white">
          <div>
            <p className="text-sm font-medium text-white/80">{item.subtitle}</p>
            <h3 className="mt-1 text-2xl font-bold tracking-tight">{item.title}</h3>
          </div>
          <Badge className="bg-white/15 text-white">{item.duration}</Badge>
        </div>
      </div>
      <div className="grid gap-4 p-5">
        <div className="grid gap-2 text-sm text-zinc-600">
          <p><span className="font-semibold text-zinc-900">Keberangkatan:</span> {item.departure}</p>
          <p><span className="font-semibold text-zinc-900">Maskapai:</span> {item.airline}</p>
          <p><span className="font-semibold text-zinc-900">Hotel:</span> {item.hotel}</p>
        </div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-zinc-500">Mulai dari</p>
            <p className="text-3xl font-extrabold tracking-tight text-emerald-700">{item.price}</p>
            <p className="text-sm text-rose-500">Sisa seat {item.seatsLeft}</p>
          </div>
          <Button>Lihat Detail</Button>
        </div>
      </div>
    </article>
  );
}

type UmrohFeaturesGridProps = {
  features: UmrohFeature[];
  className?: string;
};

export function UmrohFeaturesGrid({ features, className }: UmrohFeaturesGridProps) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2 xl:grid-cols-4", className)}>
      {features.map((feature) => (
        <Card key={feature.id} title={feature.title} description={feature.description} className="rounded-[1.8rem]" />
      ))}
    </div>
  );
}

type UmrohDetailHeroProps = {
  item: UmrohPackage;
  className?: string;
};

export function UmrohDetailHero({ item, className }: UmrohDetailHeroProps) {
  return (
    <section className={cn("grid gap-6 xl:grid-cols-[1.2fr_0.8fr]", className)}>
      <div
        className="min-h-[24rem] rounded-[2.2rem] bg-cover bg-center p-8 text-white shadow-[0_24px_60px_rgba(15,23,42,0.15)]"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(3,37,65,0.35), rgba(3,37,65,0.75)), url('${item.image}')`,
        }}
      >
        <Badge className="bg-white/15 text-white">{item.badge ?? "Paket Pilihan"}</Badge>
        <h2 className="mt-5 text-4xl font-extrabold tracking-tight">{item.title}</h2>
        <p className="mt-3 text-lg text-white/85">{item.subtitle}</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.4rem] border border-white/15 bg-white/10 p-4">
            <p className="text-sm text-white/70">Durasi</p>
            <p className="mt-2 text-xl font-semibold">{item.duration}</p>
          </div>
          <div className="rounded-[1.4rem] border border-white/15 bg-white/10 p-4">
            <p className="text-sm text-white/70">Keberangkatan</p>
            <p className="mt-2 text-xl font-semibold">{item.departure}</p>
          </div>
        </div>
      </div>

      <Card title="Ringkasan Paket" description="Informasi singkat sebelum booking" className="rounded-[2.2rem]">
        <div className="grid gap-3 text-sm text-zinc-600">
          <p><span className="font-semibold text-zinc-900">Maskapai:</span> {item.airline}</p>
          <p><span className="font-semibold text-zinc-900">Hotel:</span> {item.hotel}</p>
          <p><span className="font-semibold text-zinc-900">Sisa Seat:</span> {item.seatsLeft}</p>
          <div className="rounded-[1.4rem] bg-emerald-50 p-4">
            <p className="text-sm text-emerald-700">Harga mulai</p>
            <p className="mt-2 text-4xl font-extrabold tracking-tight text-emerald-700">{item.price}</p>
          </div>
          <Button className="mt-2">Booking Sekarang</Button>
        </div>
      </Card>
    </section>
  );
}

type UmrohItineraryTimelineProps = {
  days: UmrohItineraryDay[];
  className?: string;
};

export function UmrohItineraryTimeline({ days, className }: UmrohItineraryTimelineProps) {
  return (
    <section className={cn("rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]", className)}>
      <h3 className="text-2xl font-bold tracking-tight text-zinc-950">Itinerary Perjalanan</h3>
      <div className="mt-6 grid gap-4">
        {days.map((day) => (
          <div key={day.day} className="grid gap-3 rounded-[1.5rem] border border-zinc-100 bg-zinc-50/80 p-4 md:grid-cols-[120px_1fr]">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">{day.day}</div>
            <div>
              <p className="text-lg font-semibold text-zinc-900">{day.title}</p>
              <p className="mt-1 text-sm leading-7 text-zinc-500">{day.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

type UmrohInclusionListProps = {
  included: string[];
  excluded?: string[];
  className?: string;
};

export function UmrohInclusionList({ included, excluded = [], className }: UmrohInclusionListProps) {
  return (
    <section className={cn("grid gap-6 lg:grid-cols-2", className)}>
      <Card title="Sudah Termasuk" className="rounded-[2rem]">
        <ul className="grid gap-3">
          {included.map((item) => (
            <li key={item} className="rounded-[1.2rem] bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              {item}
            </li>
          ))}
        </ul>
      </Card>
      <Card title="Belum Termasuk" className="rounded-[2rem]">
        <ul className="grid gap-3">
          {excluded.map((item) => (
            <li key={item} className="rounded-[1.2rem] bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {item}
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
}

type UmrohTestimonialCardProps = {
  name: string;
  quote: string;
  packageName: string;
  className?: string;
};

export function UmrohTestimonialCard({ name, quote, packageName, className }: UmrohTestimonialCardProps) {
  return (
    <Card className={cn("rounded-[1.8rem]", className)}>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">{packageName}</p>
      <p className="mt-3 text-base leading-8 text-zinc-600">&ldquo;{quote}&rdquo;</p>
      <p className="mt-4 text-sm font-semibold text-zinc-900">{name}</p>
    </Card>
  );
}

type UmrohBookingStepsProps = {
  steps: Array<{ title: string; description: string }>;
  className?: string;
};

export function UmrohBookingSteps({ steps, className }: UmrohBookingStepsProps) {
  return (
    <section className={cn("rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]", className)}>
      <h3 className="text-2xl font-bold tracking-tight text-zinc-950">Langkah Pendaftaran</h3>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {steps.map((step, index) => (
          <div key={step.title} className="rounded-[1.6rem] border border-zinc-200 bg-zinc-50 p-4">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-zinc-950 text-sm font-semibold text-white">
              {index + 1}
            </div>
            <p className="mt-4 text-lg font-semibold text-zinc-900">{step.title}</p>
            <p className="mt-2 text-sm leading-7 text-zinc-500">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

type UmrohPaymentSummaryProps = {
  packageName: string;
  basePrice: string;
  adminFee: string;
  total: string;
  className?: string;
};

export function UmrohPaymentSummary({
  packageName,
  basePrice,
  adminFee,
  total,
  className,
}: UmrohPaymentSummaryProps) {
  return (
    <Card title="Ringkasan Pembayaran" description={packageName} className={cn("rounded-[2rem]", className)}>
      <div className="grid gap-3 text-sm text-zinc-600">
        <div className="flex items-center justify-between gap-4">
          <span>Biaya paket</span>
          <span className="font-semibold text-zinc-900">{basePrice}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span>Biaya admin</span>
          <span className="font-semibold text-zinc-900">{adminFee}</span>
        </div>
        <div className="mt-2 flex items-center justify-between gap-4 rounded-[1.4rem] bg-emerald-50 px-4 py-4">
          <span className="text-base font-semibold text-emerald-800">Total bayar</span>
          <span className="text-2xl font-extrabold tracking-tight text-emerald-700">{total}</span>
        </div>
      </div>
    </Card>
  );
}

type UmrohPaymentMethodsProps = {
  methods: UmrohPaymentMethod[];
  className?: string;
};

export function UmrohPaymentMethods({ methods, className }: UmrohPaymentMethodsProps) {
  const [selected, setSelected] = useState(methods[0]?.id ?? "");

  return (
    <Card title="Metode Pembayaran" description="Pilih cara pembayaran yang paling nyaman" className={cn("rounded-[2rem]", className)}>
      <div className="grid gap-3">
        {methods.map((method) => {
          const active = selected === method.id;

          return (
            <button
              key={method.id}
              type="button"
              onClick={() => setSelected(method.id)}
              className={cn(
                "rounded-[1.4rem] border px-4 py-4 text-left transition",
                active ? "border-emerald-300 bg-emerald-50" : "border-zinc-200 bg-white hover:bg-zinc-50"
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-zinc-900">{method.label}</p>
                {method.badge ? <Badge variant="success">{method.badge}</Badge> : null}
              </div>
              <p className="mt-2 text-sm text-zinc-500">{method.description}</p>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

type UmrohFaqSectionProps = {
  items: Array<{ question: string; answer: string }>;
  className?: string;
};

export function UmrohFaqSection({ items, className }: UmrohFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={cn("rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]", className)}>
      <h3 className="text-2xl font-bold tracking-tight text-zinc-950">Pertanyaan Umum</h3>
      <div className="mt-6 grid gap-3">
        {items.map((item, index) => {
          const open = openIndex === index;

          return (
            <div key={item.question} className="rounded-[1.5rem] border border-zinc-200 bg-zinc-50">
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-base font-semibold text-zinc-900">{item.question}</span>
                <span className="text-zinc-400">{open ? "-" : "+"}</span>
              </button>
              {open ? <div className="border-t border-zinc-200 px-5 py-4 text-sm leading-7 text-zinc-500">{item.answer}</div> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

type UmrohCtaBannerProps = {
  title: string;
  description: string;
  className?: string;
};

export function UmrohCtaBanner({ title, description, className }: UmrohCtaBannerProps) {
  return (
    <section className={cn("rounded-[2.2rem] bg-[linear-gradient(135deg,#0f766e,#065f46)] px-6 py-8 text-white shadow-[0_24px_60px_rgba(6,95,70,0.22)] sm:px-8", className)}>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h3 className="text-3xl font-extrabold tracking-tight">{title}</h3>
          <p className="mt-3 text-base leading-8 text-white/85">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button className="bg-white text-emerald-900 hover:bg-emerald-50">Daftar Sekarang</Button>
          <Button variant="secondary" className="border-white/20 bg-white/10 text-white hover:bg-white/15">
            Chat Konsultan
          </Button>
        </div>
      </div>
    </section>
  );
}
