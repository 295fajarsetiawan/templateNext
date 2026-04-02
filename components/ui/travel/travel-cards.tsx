"use client";

import { useState } from "react";

import { cn } from "@/lib/cn";

type OneWayDealCardProps = {
  image: string;
  route: string;
  date: string;
  price: string;
  badge?: string;
  className?: string;
  imageClassName?: string;
  contentClassName?: string;
};

export function OneWayDealCard({
  image,
  route,
  date,
  price,
  badge = "ONE-WAY",
  className,
  imageClassName,
  contentClassName,
}: OneWayDealCardProps) {
  return (
    <article className={cn("overflow-hidden rounded-[1.6rem] border border-zinc-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]", className)}>
      <div
        className={cn("relative h-64 bg-cover bg-center", imageClassName)}
        style={{ backgroundImage: `linear-gradient(180deg, rgba(8,15,32,0.08), rgba(255,255,255,0.04)), url('${image}')` }}
      >
        <span className="absolute left-3 top-3 rounded-r-xl rounded-tl-xl bg-[#051b2c] px-3 py-2 text-sm font-extrabold tracking-wide text-white">
          {badge}
        </span>
      </div>
      <div className={cn("grid gap-2 px-4 py-4", contentClassName)}>
        <h3 className="text-[2rem] leading-none font-semibold tracking-tight text-zinc-800">{route}</h3>
        <p className="text-base font-medium text-zinc-500">{date}</p>
        <p className="text-[2rem] font-extrabold tracking-tight text-[#f7931a]">{price}</p>
      </div>
    </article>
  );
}

type DestinationSpotlightCardProps = {
  image: string;
  title: string;
  subtitle: string;
  className?: string;
  overlayClassName?: string;
};

export function DestinationSpotlightCard({
  image,
  title,
  subtitle,
  className,
  overlayClassName,
}: DestinationSpotlightCardProps) {
  return (
    <article
      className={cn("relative min-h-[17rem] overflow-hidden rounded-[1.6rem] shadow-[0_18px_40px_rgba(15,23,42,0.12)]", className)}
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(6,16,34,0.1), rgba(6,16,34,0.45)), url('${image}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={cn("absolute inset-0 flex items-start p-6", overlayClassName)}>
        <div className="max-w-xs text-white">
          <h3 className="text-5xl font-bold tracking-tight drop-shadow-[0_6px_20px_rgba(0,0,0,0.35)]">{title}</h3>
          <p className="mt-2 text-2xl font-semibold text-white/90">{subtitle}</p>
        </div>
      </div>
    </article>
  );
}

export type PromoCarouselTab = {
  id: string;
  label: string;
};

export type PromoCarouselCard = {
  id: string;
  image: string;
  accentFrom: string;
  accentTo: string;
  destination: string;
  discount: string;
};

type PromoCarouselSectionProps = {
  title: string;
  tabs: PromoCarouselTab[];
  cards: PromoCarouselCard[];
  className?: string;
};

export function PromoCarouselSection({
  title,
  tabs,
  cards,
  className,
}: PromoCarouselSectionProps) {
  const [activeTab, setActiveTab] = useState(tabs[1]?.id ?? tabs[0]?.id ?? "");
  const [offset, setOffset] = useState(0);
  const maxOffset = Math.max(0, cards.length - 3);
  const visibleCards = cards.slice(offset, offset + 3);

  return (
    <section className={cn("grid gap-6", className)}>
      <div>
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-[#8bc34a] bg-[#f5fbeb] text-[#2b7a0b]">
            ✓
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-zinc-800">{title}</h2>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          {tabs.map((tab) => {
            const active = tab.id === activeTab;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "rounded-full px-6 py-3 text-sm font-semibold transition",
                  active ? "bg-[#1697f6] text-white shadow-[0_12px_24px_rgba(22,151,246,0.24)]" : "bg-zinc-100 text-[#1697f6]"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative">
        <div className="grid gap-4 lg:grid-cols-3">
          {visibleCards.map((card) => (
            <article
              key={card.id}
              className="overflow-hidden rounded-[1.4rem] shadow-[0_18px_40px_rgba(15,23,42,0.1)]"
            >
              <div
                className="relative min-h-[12rem] bg-cover bg-center p-4"
                style={{ backgroundImage: `url('${card.image}')` }}
              >
                <div
                  className="absolute inset-0 opacity-90"
                  style={{
                    background: `linear-gradient(135deg, ${card.accentFrom}, ${card.accentTo})`,
                    mixBlendMode: "multiply",
                  }}
                />
                <div className="relative z-10 grid h-full grid-cols-[1.2fr_1fr] gap-3">
                  <div className="rounded-[1.1rem] border-4 border-[rgba(38,211,201,0.9)] bg-cover bg-center"
                    style={{ backgroundImage: `url('${card.image}')` }}
                  />
                  <div className="flex flex-col justify-center rounded-[1.2rem] bg-white/95 p-4 text-[#0a67c9]">
                    <p className="text-sm font-semibold text-zinc-500">Travel to</p>
                    <p className="text-3xl font-extrabold leading-none">{card.destination}</p>
                    <p className="mt-3 text-sm font-semibold text-zinc-500">up to</p>
                    <p className="text-5xl font-black leading-none">{card.discount}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOffset((current) => (current >= maxOffset ? 0 : current + 1))}
          className="absolute right-3 top-1/2 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full bg-white text-2xl text-[#1697f6] shadow-[0_16px_32px_rgba(15,23,42,0.16)]"
          aria-label="Next promos"
        >
          ›
        </button>
      </div>
    </section>
  );
}
