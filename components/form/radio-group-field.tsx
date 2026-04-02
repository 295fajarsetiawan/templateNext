"use client";

import { useId } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";

import { FieldShell } from "@/components/form/field-shell";
import { cn } from "@/lib/cn";

type RadioOption = {
  label: string;
  value: string;
  description?: string;
};

type RadioGroupFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  options: RadioOption[];
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  optionClassName?: string;
  labelClassName?: string;
  hintClassName?: string;
  errorClassName?: string;
};

export function RadioGroupField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  options,
  hint,
  required,
  disabled,
  className,
  optionClassName,
  labelClassName,
  hintClassName,
  errorClassName,
}: RadioGroupFieldProps<TFieldValues>) {
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
          <div className="grid gap-3">
            {options.map((option) => (
              <label
                key={option.value}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-2xl border border-zinc-200 bg-white p-4",
                  disabled && "cursor-not-allowed opacity-60",
                  optionClassName
                )}
              >
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={field.value === option.value}
                  disabled={disabled}
                  onBlur={field.onBlur}
                  onChange={() => field.onChange(option.value)}
                  className="mt-0.5"
                />
                <span className="flex flex-col">
                  <span className="text-sm font-medium text-zinc-900">{option.label}</span>
                  {option.description ? (
                    <span className="text-xs text-zinc-500">{option.description}</span>
                  ) : null}
                </span>
              </label>
            ))}
          </div>
        </FieldShell>
      )}
    />
  );
}

export type { RadioOption };
