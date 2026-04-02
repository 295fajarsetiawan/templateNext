"use client";

import { useId } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";

import { FieldShell, inputClassName } from "@/components/form/field-shell";
import { cn } from "@/lib/cn";

type DateFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  hintClassName?: string;
  errorClassName?: string;
};

export function DateField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  hint,
  required,
  disabled,
  className,
  inputClassName: customInputClassName,
  labelClassName,
  hintClassName,
  errorClassName,
}: DateFieldProps<TFieldValues>) {
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
          <input
            {...field}
            id={id}
            type="date"
            disabled={disabled}
            value={field.value ?? ""}
            className={cn(inputClassName, customInputClassName)}
          />
        </FieldShell>
      )}
    />
  );
}
