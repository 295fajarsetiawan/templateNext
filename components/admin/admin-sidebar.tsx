"use client";

import type { AdminNavGroup, AdminNavItem } from "@/lib/admin-dashboard";
import { cn } from "@/lib/cn";
import { AdminNavIcon } from "@/components/admin/admin-icons";

type AdminSidebarProps = {
  items?: AdminNavItem[];
  groups?: AdminNavGroup[];
  activeId?: string;
  className?: string;
  fullHeight?: boolean;
};

function AdminSidebarLink({
  item,
  active,
}: {
  item: AdminNavItem;
  active: boolean;
}) {
  return (
    <a
      href={item.href ?? "#"}
      className={cn(
        "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition",
        active
          ? "bg-zinc-950 text-white"
          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
      )}
    >
      <span className="flex items-center gap-3">
        <AdminNavIcon icon={item.icon} className={active ? "text-white" : "text-sky-600"} />
        <span>{item.label}</span>
      </span>
      {item.badge ? (
        <span
          className={cn(
            "rounded-full px-2 py-1 text-xs",
            active ? "bg-white/15 text-white" : "bg-zinc-100 text-zinc-600"
          )}
        >
          {item.badge}
        </span>
      ) : null}
    </a>
  );
}

export function AdminSidebar({
  items,
  groups,
  activeId,
  className,
  fullHeight = false,
}: AdminSidebarProps) {
  const navigationGroups =
    groups ?? (items ? [{ id: "navigation", label: "Menu", items }] : []);

  return (
    <aside
      className={cn(
        "bg-white p-5 text-zinc-950",
        fullHeight
          ? "flex h-full min-h-0 flex-col overflow-y-auto border-r border-zinc-200"
          : "rounded-[2rem] border border-zinc-200 shadow-[0_24px_60px_rgba(15,23,42,0.08)]",
        className
      )}
    >
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">Admin Kit</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight">Control Hub</h2>
      </div>
      <nav className="grid gap-6">
        {navigationGroups.map((group) => (
          <div key={group.id} className="grid gap-2">
            <p className="px-4 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-zinc-400">
              {group.label}
            </p>
            <div className="grid gap-1.5">
              {group.items.map((item) => (
                <AdminSidebarLink
                  key={item.id}
                  item={item}
                  active={item.id === activeId}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
