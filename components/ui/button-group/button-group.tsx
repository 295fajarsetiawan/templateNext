import { cn } from "@/lib/cn";

type ButtonGroupProps = {
  children: React.ReactNode;
  className?: string;
};

export function ButtonGroup({ children, className }: ButtonGroupProps) {
  return <div className={cn("inline-flex flex-wrap items-center gap-2", className)}>{children}</div>;
}
