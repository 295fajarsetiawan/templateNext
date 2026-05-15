"use client";

import { Avatar } from "@/components/ui";
import { cn } from "@/lib/cn";

type AdminHeaderProps = {
  title: string;
  description?: string;
  className?: string;
  sticky?: boolean;
};

export function AdminHeader({
  title,
  description,
  className,
  sticky = false,
}: AdminHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-3 border border-zinc-200 bg-white/95 px-4 py-3 shadow-[0_12px_30px_rgba(15,23,42,0.05)] backdrop-blur sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8",
        sticky ? "sticky top-16 z-20 rounded-none border-x-0 border-t-0 xl:top-0" : "rounded-2xl",
        className
      )}
    >
      <div className="min-w-0">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-sky-600">
          Admin Dashboard
        </p>
        <h1 className="mt-1 text-lg font-bold tracking-tight text-zinc-950 sm:text-xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-1 max-w-2xl text-xs leading-5 text-zinc-500 sm:text-sm">
            {description}
          </p>
        ) : null}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-2.5 py-1.5">
          <Avatar fallback="WA" size="sm" />
          <div className="text-xs">
            <p className="font-semibold text-zinc-900">Wan Admin</p>
            <p className="text-zinc-500">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
