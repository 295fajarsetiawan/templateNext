import { cn } from "@/lib/cn";

type AlertProps = {
  title: string;
  description?: string;
  variant?: "default" | "success" | "warning" | "danger";
  className?: string;
};

const variants = {
  default: "border-zinc-200 bg-zinc-50 text-zinc-800",
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  danger: "border-rose-200 bg-rose-50 text-rose-800",
};

export function Alert({ title, description, variant = "default", className }: AlertProps) {
  return (
    <div className={cn("rounded-2xl border px-4 py-3", variants[variant], className)}>
      <p className="text-sm font-semibold">{title}</p>
      {description ? <p className="mt-1 text-sm opacity-90">{description}</p> : null}
    </div>
  );
}
