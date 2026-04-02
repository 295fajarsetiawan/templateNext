"use client";

import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useId } from "react";

import { cn } from "@/lib/cn";

type CheckboxFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
};

export function CheckboxField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  disabled,
  className,
  labelClassName,
  descriptionClassName,
  errorClassName,
}: CheckboxFieldProps<TFieldValues>) {
  const id = useId();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-2">
          <label
            htmlFor={id}
            className={cn(
              "flex items-start gap-3 rounded-2xl border border-zinc-200 bg-white p-4",
              disabled ? "opacity-60" : "cursor-pointer",
              className
            )}
          >
            <input
              id={id}
              type="checkbox"
              checked={Boolean(field.value)}
              onChange={(event) => field.onChange(event.target.checked)}
              onBlur={field.onBlur}
              disabled={disabled}
              className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-zinc-950 focus:ring-zinc-300"
            />
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
          </label>
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
