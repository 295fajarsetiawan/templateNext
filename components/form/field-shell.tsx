"use client";

import { cn } from "@/lib/cn";

type FieldShellProps = {
  label: string;
  htmlFor?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
  labelClassName?: string;
  hintClassName?: string;
  errorClassName?: string;
};

export function FieldShell({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
  className,
  labelClassName,
  hintClassName,
  errorClassName,
}: FieldShellProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={htmlFor} className={cn("text-sm font-medium text-zinc-900", labelClassName)}>
        {label}
        {required ? <span className="ml-1 text-rose-600">*</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <span className={cn("text-xs text-zinc-500", hintClassName)}>{hint}</span>
      ) : null}
      {error ? (
        <span className={cn("text-xs text-rose-600", errorClassName)}>{error}</span>
      ) : null}
    </div>
  );
}

export const inputClassName =
  "w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-zinc-400 focus:ring-4 focus:ring-zinc-200/60 disabled:cursor-not-allowed disabled:bg-zinc-100";

export const surfaceClassName =
  "rounded-2xl border border-zinc-200 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)]";
