"use client";

import { useState } from "react";

import { cn } from "@/lib/cn";

type CarouselProps = {
  items: React.ReactNode[];
  className?: string;
  viewportClassName?: string;
};

export function Carousel({ items, className, viewportClassName }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const safeIndex = Math.min(index, Math.max(0, items.length - 1));

  return (
    <div className={cn("grid gap-4", className)}>
      <div className={cn("overflow-hidden rounded-[2rem] border border-zinc-200 bg-white", viewportClassName)}>
        <div className="p-6">{items[safeIndex]}</div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setIndex((current) => Math.max(0, current - 1))}
          className="rounded-full border border-zinc-200 px-4 py-2 text-sm"
        >
          Prev
        </button>
        <div className="flex gap-2">
          {items.map((_, itemIndex) => (
            <button
              key={itemIndex}
              type="button"
              onClick={() => setIndex(itemIndex)}
              className={cn(
                "h-2.5 w-2.5 rounded-full",
                itemIndex === safeIndex ? "bg-zinc-950" : "bg-zinc-300"
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setIndex((current) => Math.min(items.length - 1, current + 1))}
          className="rounded-full border border-zinc-200 px-4 py-2 text-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
}
