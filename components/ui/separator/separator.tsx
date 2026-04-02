import { cn } from "@/lib/cn";

type SeparatorProps = {
  orientation?: "horizontal" | "vertical";
  className?: string;
};

export function Separator({ orientation = "horizontal", className }: SeparatorProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "bg-zinc-200",
        orientation === "horizontal" ? "h-px w-full" : "h-full min-h-6 w-px",
        className
      )}
    />
  );
}
