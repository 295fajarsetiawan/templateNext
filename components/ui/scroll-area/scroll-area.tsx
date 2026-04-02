import { cn } from "@/lib/cn";

type ScrollAreaProps = {
  children: React.ReactNode;
  className?: string;
};

export function ScrollArea({ children, className }: ScrollAreaProps) {
  return <div className={cn("overflow-auto rounded-2xl", className)}>{children}</div>;
}
