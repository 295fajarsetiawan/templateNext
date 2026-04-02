"use client";

import { Avatar } from "@/components/ui";
import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";

type AdminHeaderProps = {
  title: string;
  description?: string;
  className?: string;
};

export function AdminHeader({ title, description, className }: AdminHeaderProps) {
  return (
    <header className={cn("flex flex-col gap-4 rounded-[2rem] border border-zinc-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] lg:flex-row lg:items-center lg:justify-between", className)}>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-600">Admin Dashboard</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950">{title}</h1>
        {description ? <p className="mt-2 text-sm text-zinc-500">{description}</p> : null}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <input
          placeholder="Search dashboard..."
          className="w-full min-w-[14rem] rounded-full border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-zinc-400 lg:w-auto"
        />
        <Button variant="secondary">Export</Button>
        <div className="flex items-center gap-3 rounded-full border border-zinc-200 bg-white px-3 py-2">
          <Avatar fallback="WA" />
          <div className="text-sm">
            <p className="font-semibold text-zinc-900">Wan Admin</p>
            <p className="text-zinc-500">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
