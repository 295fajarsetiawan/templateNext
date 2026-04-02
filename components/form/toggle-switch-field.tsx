"use client";

import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";

import { cn } from "@/lib/cn";

type ToggleSwitchFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  switchClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
};

export function ToggleSwitchField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  disabled,
  className,
  switchClassName,
  labelClassName,
  descriptionClassName,
  errorClassName,
}: ToggleSwitchFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-2">
          <button
            type="button"
            disabled={disabled}
            onClick={() => field.onChange(!field.value)}
            className={cn(
              "flex w-full items-center justify-between rounded-2xl border border-zinc-200 bg-white p-4 text-left",
              disabled && "cursor-not-allowed opacity-60",
              className
            )}
          >
            <span className="flex flex-col gap-1">
              <span className={cn("text-sm font-medium text-zinc-900", labelClassName)}>
                {label}
              </span>
              {description ? (
                <span className={cn("text-xs text-zinc-500", descriptionClassName)}>
                  {description}
                </span>
              ) : null}
            </span>
            <span
              className={cn(
                "relative h-7 w-12 rounded-full transition",
                field.value ? "bg-zinc-900" : "bg-zinc-300",
                switchClassName
              )}
            >
              <span
                className={cn(
                  "absolute top-1 h-5 w-5 rounded-full bg-white transition",
                  field.value ? "left-6" : "left-1"
                )}
              />
            </span>
          </button>
          {fieldState.error?.message ? (
            <span className={cn("text-xs text-rose-600", errorClassName)}>
              {fieldState.error.message}
            </span>
          ) : null}
        </div>
      )}
    />
  );
}
