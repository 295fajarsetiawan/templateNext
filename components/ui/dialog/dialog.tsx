"use client";

import { cn } from "@/lib/cn";
import { uiSurfaceClassName } from "@/components/ui/core/styles";

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
};

export function Dialog({ open, onOpenChange, title, description, children, className }: DialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4">
      <div className={cn(uiSurfaceClassName, "w-full max-w-xl p-6", className)}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-zinc-950">{title}</h3>
            {description ? <p className="mt-2 text-sm text-zinc-500">{description}</p> : null}
          </div>
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
