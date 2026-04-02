import { cn } from "@/lib/cn";

type ItemProps = {
  title: string;
  description?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  className?: string;
};

export function Item({ title, description, leading, trailing, className }: ItemProps) {
  return (
    <div className={cn("flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-4", className)}>
      {leading ? <div>{leading}</div> : null}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-zinc-950">{title}</p>
        {description ? <p className="mt-1 text-sm text-zinc-500">{description}</p> : null}
      </div>
      {trailing ? <div>{trailing}</div> : null}
    </div>
  );
}
