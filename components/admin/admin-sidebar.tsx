"use client";

import type { AdminNavItem } from "@/lib/admin-dashboard";
import { cn } from "@/lib/cn";
import { AdminNavIcon } from "@/components/admin/admin-icons";

type AdminSidebarProps = {
  items: AdminNavItem[];
  activeId?: string;
  className?: string;
};

export function AdminSidebar({ items, activeId, className }: AdminSidebarProps) {
  return (
    <aside className={cn("rounded-[2rem] bg-[#0f172a] p-5 text-white shadow-[0_24px_60px_rgba(15,23,42,0.22)]", className)}>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">Admin Kit</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight">Control Hub</h2>
      </div>
      <nav className="grid gap-2">
        {items.map((item) => {
          const active = item.id === activeId;

          return (
            <a
              key={item.id}
              href={item.href ?? "#"}
              className={cn(
                "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition",
                active ? "bg-white text-zinc-900" : "text-slate-300 hover:bg-white/10 hover:text-white"
              )}
            >
              <span className="flex items-center gap-3">
                <AdminNavIcon icon={item.icon} className={active ? "text-zinc-900" : "text-sky-300"} />
                <span>{item.label}</span>
              </span>
              {item.badge ? (
                <span className={cn("rounded-full px-2 py-1 text-xs", active ? "bg-zinc-100 text-zinc-700" : "bg-white/10 text-white")}>
                  {item.badge}
                </span>
              ) : null}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
