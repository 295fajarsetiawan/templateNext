"use client";

import { useId } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";

import { FieldShell, inputClassName } from "@/components/form/field-shell";
import { cn } from "@/lib/cn";

type ColorPickerFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  previewClassName?: string;
  labelClassName?: string;
  hintClassName?: string;
  errorClassName?: string;
};

export function ColorPickerField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  hint,
  required,
  disabled,
  className,
  inputClassName: customInputClassName,
  previewClassName,
  labelClassName,
  hintClassName,
  errorClassName,
}: ColorPickerFieldProps<TFieldValues>) {
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
          <div className="flex items-center gap-3">
            <input
              {...field}
              id={id}
              type="color"
              disabled={disabled}
              value={field.value ?? "#171717"}
              className={cn(
                inputClassName,
                "h-12 w-16 cursor-pointer p-1",
                customInputClassName
              )}
            />
            <span
              className={cn(
                "rounded-full bg-zinc-100 px-3 py-2 text-sm text-zinc-700",
                previewClassName
              )}
            >
              {field.value ?? "#171717"}
            </span>
          </div>
        </FieldShell>
      )}
    />
  );
}
