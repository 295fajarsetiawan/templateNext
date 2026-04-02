import type { AdminActivity } from "@/lib/admin-dashboard";
import { cn } from "@/lib/cn";

type AdminActivityFeedProps = {
  items: AdminActivity[];
  className?: string;
};

const tones = {
  default: "bg-zinc-200",
  success: "bg-emerald-400",
  warning: "bg-amber-400",
  danger: "bg-rose-400",
};

export function AdminActivityFeed({ items, className }: AdminActivityFeedProps) {
  return (
    <section className={cn("rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]", className)}>
      <h3 className="text-xl font-semibold text-zinc-950">Recent Activity</h3>
      <div className="mt-5 grid gap-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 rounded-2xl border border-zinc-100 bg-zinc-50/70 p-4">
            <span className={cn("mt-1 h-3 w-3 rounded-full", tones[item.tone ?? "default"])} />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-zinc-900">{item.title}</p>
              <p className="mt-1 text-sm text-zinc-500">{item.description}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
