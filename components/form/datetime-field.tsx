"use client";

import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useId } from "react";

import { FieldShell, inputClassName } from "@/components/form/field-shell";

type DateTimeFieldProps<TFieldValues extends FieldValues> = {
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

export function DateTimeField<TFieldValues extends FieldValues>({
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
}: DateTimeFieldProps<TFieldValues>) {
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
            type="datetime-local"
            disabled={disabled}
            value={field.value ?? ""}
            className={inputClassName + (customInputClassName ? ` ${customInputClassName}` : "")}
          />
        </FieldShell>
      )}
    />
  );
}
