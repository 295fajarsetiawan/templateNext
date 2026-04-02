import { cn } from "@/lib/cn";

export type ChartPoint = {
  label: string;
  value: number;
  color?: string;
};

type BarChartProps = {
  data: ChartPoint[];
  className?: string;
  barClassName?: string;
};

export function Chart({ data, className, barClassName }: BarChartProps) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className={cn("grid gap-4 rounded-[2rem] border border-zinc-200 bg-white p-6", className)}>
      <div className="flex h-52 items-end gap-3">
        {data.map((item) => (
          <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
            <div
              className={cn("w-full rounded-t-2xl bg-zinc-950", barClassName)}
              style={{
                height: `${(item.value / max) * 100}%`,
                backgroundColor: item.color,
              }}
            />
            <div className="text-center text-xs text-zinc-500">
              <div>{item.label}</div>
              <div className="font-semibold text-zinc-900">{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
