"use client";

import { useId } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";

import { FieldShell } from "@/components/form/field-shell";
import { cn } from "@/lib/cn";

type RangeSliderFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  valueClassName?: string;
  labelClassName?: string;
  hintClassName?: string;
  errorClassName?: string;
};

export function RangeSliderField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  min = 0,
  max = 100,
  step = 1,
  hint,
  required,
  disabled,
  className,
  inputClassName,
  valueClassName,
  labelClassName,
  hintClassName,
  errorClassName,
}: RangeSliderFieldProps<TFieldValues>) {
  const id = useId();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FieldShell
          label={label}
          htmlFor={id}
          hint={hint}
          required={required}
          error={fieldState.error?.message}
          className={className}
          labelClassName={labelClassName}
          hintClassName={hintClassName}
          errorClassName={errorClassName}
        >
          <div className="flex items-center gap-4">
            <input
              id={id}
              type="range"
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              value={typeof field.value === "number" ? field.value : min}
              onBlur={field.onBlur}
              onChange={(event) => field.onChange(Number(event.target.value))}
              className={cn("w-full accent-zinc-900", inputClassName)}
            />
            <span
              className={cn(
                "min-w-14 rounded-full bg-zinc-100 px-3 py-1 text-center text-sm font-medium text-zinc-700",
                valueClassName
              )}
            >
              {typeof field.value === "number" ? field.value : min}
            </span>
          </div>
        </FieldShell>
      )}
    />
  );
}
