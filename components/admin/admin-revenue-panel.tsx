import { Chart } from "@/components/ui";
import type { RevenuePoint } from "@/lib/admin-dashboard";
import { cn } from "@/lib/cn";

type AdminRevenuePanelProps = {
  title?: string;
  description?: string;
  data: RevenuePoint[];
  className?: string;
};

export function AdminRevenuePanel({
  title = "Revenue Overview",
  description = "Monthly trend and performance snapshot.",
  data,
  className,
}: AdminRevenuePanelProps) {
  return (
    <section className={cn("rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]", className)}>
      <h3 className="text-xl font-semibold text-zinc-950">{title}</h3>
      <p className="mt-2 text-sm text-zinc-500">{description}</p>
      <div className="mt-5">
        <Chart data={data} />
      </div>
    </section>
  );
}
