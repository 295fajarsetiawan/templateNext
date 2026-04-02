import { cn } from "@/lib/cn";
import { uiSurfaceClassName } from "@/components/ui/core/styles";

type CardProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
};

export function Card({ title, description, children, className }: CardProps) {
  return (
    <section className={cn(uiSurfaceClassName, "p-6", className)}>
      {title ? <h3 className="text-lg font-semibold text-zinc-950">{title}</h3> : null}
      {description ? <p className="mt-2 text-sm text-zinc-500">{description}</p> : null}
      {children ? <div className={cn(title || description ? "mt-4" : "")}>{children}</div> : null}
    </section>
  );
}
