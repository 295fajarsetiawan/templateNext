"use client";

import { useId } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";

import { FieldShell } from "@/components/form/field-shell";
import { cn } from "@/lib/cn";

type RatingFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  max?: number;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  buttonClassName?: string;
  activeClassName?: string;
  labelClassName?: string;
  hintClassName?: string;
  errorClassName?: string;
};

export function RatingField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  max = 5,
  hint,
  required,
  disabled,
  className,
  buttonClassName,
  activeClassName,
  labelClassName,
  hintClassName,
  errorClassName,
}: RatingFieldProps<TFieldValues>) {
  const id = useId();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const parsedValue =
          typeof field.value === "number"
            ? field.value
            : Number(field.value ?? 0);
        const currentValue = Number.isFinite(parsedValue) ? parsedValue : 0;

        return (
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
            <div className="flex gap-2">
              {Array.from({ length: max }, (_, index) => {
                const value = index + 1;
                const active = value <= currentValue;

                return (
                  <button
                    key={`${id}-${value}`}
                    type="button"
                    disabled={disabled}
                    aria-pressed={active}
                    aria-label={`Set rating to ${value}`}
                    onClick={() => field.onChange(value)}
                    className={cn(
                      "text-3xl leading-none text-amber-400 transition hover:scale-110 hover:text-amber-400",
                      active && "text-amber-400",
                      active && activeClassName,
                      buttonClassName
                    )}
                  >
                    {active ? "★" : "☆"}
                  </button>
                );
              })}
            </div>
          </FieldShell>
        );
      }}
    />
  );
}
