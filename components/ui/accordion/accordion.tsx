"use client";

import { useState } from "react";

import { cn } from "@/lib/cn";
import { uiSurfaceClassName } from "@/components/ui/core/styles";

export type AccordionItemData = {
  id: string;
  title: string;
  content: React.ReactNode;
};

type AccordionProps = {
  items: AccordionItemData[];
  defaultValue?: string | null;
  className?: string;
  itemClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
};

export function Accordion({
  items,
  defaultValue = null,
  className,
  itemClassName,
  triggerClassName,
  contentClassName,
}: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultValue);

  return (
    <div className={cn("grid gap-3", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div key={item.id} className={cn(uiSurfaceClassName, "overflow-hidden", itemClassName)}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className={cn(
                "flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-zinc-950",
                triggerClassName
              )}
            >
              <span>{item.title}</span>
              <span className="text-zinc-400">{isOpen ? "-" : "+"}</span>
            </button>
            {isOpen ? (
              <div className={cn("border-t border-zinc-200 px-5 py-4 text-sm text-zinc-600", contentClassName)}>
                {item.content}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
