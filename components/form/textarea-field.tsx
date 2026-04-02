"use client";

import { useId } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";

import { FieldShell, inputClassName } from "@/components/form/field-shell";
import { cn } from "@/lib/cn";

type TextareaFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  hint?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  hintClassName?: string;
  errorClassName?: string;
};

export function TextareaField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  hint,
  placeholder,
  required,
  disabled,
  rows = 4,
  className,
  inputClassName: customInputClassName,
  labelClassName,
  hintClassName,
  errorClassName,
}: TextareaFieldProps<TFieldValues>) {
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
          <textarea
            {...field}
            id={id}
            rows={rows}
            placeholder={placeholder}
            disabled={disabled}
            value={field.value ?? ""}
            className={cn(inputClassName, "resize-y", customInputClassName)}
          />
        </FieldShell>
      )}
    />
  );
}
