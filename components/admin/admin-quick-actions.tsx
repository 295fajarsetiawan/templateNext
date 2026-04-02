"use client";

import type { AdminQuickAction } from "@/lib/admin-dashboard";
import { cn } from "@/lib/cn";
import { AdminActionIcon } from "@/components/admin/admin-icons";

type AdminQuickActionsProps = {
  actions: AdminQuickAction[];
  onActionClick?: (action: AdminQuickAction) => void;
  className?: string;
};

export function AdminQuickActions({ actions, onActionClick, className }: AdminQuickActionsProps) {
  return (
    <section className={cn("rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]", className)}>
      <h3 className="text-xl font-semibold text-zinc-950">Quick Actions</h3>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {actions.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => onActionClick?.(action)}
            className="flex items-start gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4 text-left transition hover:bg-white"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-zinc-950 text-white">
              <AdminActionIcon icon={action.icon} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-zinc-900">{action.label}</span>
              {action.description ? <span className="mt-1 block text-sm text-zinc-500">{action.description}</span> : null}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
