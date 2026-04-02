"use client";

import { useState } from "react";

import { cn } from "@/lib/cn";
import { uiSurfaceClassName } from "@/components/ui/core/styles";

type HoverCardProps = {
  trigger: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

export function HoverCard({ trigger, content, className, contentClassName }: HoverCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn("relative inline-flex", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {trigger}
      {open ? (
        <div className={cn(uiSurfaceClassName, "absolute left-0 top-full z-20 mt-2 w-72 p-4", contentClassName)}>
          {content}
        </div>
      ) : null}
    </div>
  );
}
