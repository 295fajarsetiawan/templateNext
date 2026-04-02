"use client";

import { cn } from "@/lib/cn";
import { uiSurfaceClassName } from "@/components/ui/core/styles";

type DrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: "left" | "right";
  title: string;
  children?: React.ReactNode;
  className?: string;
};

export function Drawer({ open, onOpenChange, side = "right", title, children, className }: DrawerProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/35">
      <div
        className={cn(
          uiSurfaceClassName,
          "absolute top-0 h-full w-full max-w-md rounded-none p-6",
          side === "right" ? "right-0" : "left-0",
          className
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-zinc-950">{title}</h3>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-full border border-zinc-200 px-3 py-1 text-sm text-zinc-700"
          >
            Close
          </button>
        </div>
        {children ? <div className="mt-5">{children}</div> : null}
      </div>
    </div>
  );
}
