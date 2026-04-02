import type { AdminStat } from "@/lib/admin-dashboard";
import { cn } from "@/lib/cn";

type AdminStatCardProps = {
  stat: AdminStat;
  className?: string;
};

export function AdminStatCard({ stat, className }: AdminStatCardProps) {
  const trendClass =
    stat.trend === "up"
      ? "text-emerald-600"
      : stat.trend === "down"
        ? "text-rose-600"
        : "text-zinc-500";

  return (
    <article className={cn("rounded-[1.7rem] border border-zinc-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]", className)}>
      <p className="text-sm font-medium text-zinc-500">{stat.label}</p>
      <p className="mt-3 text-4xl font-bold tracking-tight text-zinc-950">{stat.value}</p>
      <p className={cn("mt-2 text-sm font-semibold", trendClass)}>{stat.change}</p>
    </article>
  );
}
