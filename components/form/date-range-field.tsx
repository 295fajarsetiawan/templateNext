"use client";

import { useId } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";

import { FieldShell, inputClassName } from "@/components/form/field-shell";
import { cn } from "@/lib/cn";

type DateRangeValue = {
  from: string;
  to: string;
};

type DateRangeFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  containerClassName?: string;
  labelClassName?: string;
  hintClassName?: string;
  errorClassName?: string;
};

export function DateRangeField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  hint,
  required,
  disabled,
  className,
  inputClassName: customInputClassName,
  containerClassName,
  labelClassName,
  hintClassName,
  errorClassName,
}: DateRangeFieldProps<TFieldValues>) {
  const id = useId();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const value = (field.value ?? { from: "", to: "" }) as DateRangeValue;

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
            <div className={cn("grid gap-3 sm:grid-cols-2", containerClassName)}>
              <input
                id={id}
                type="date"
                disabled={disabled}
                value={value.from ?? ""}
                className={cn(inputClassName, customInputClassName)}
                onBlur={field.onBlur}
                onChange={(event) =>
                  field.onChange({
                    ...value,
                    from: event.target.value,
                  })
                }
              />
              <input
                type="date"
                disabled={disabled}
                value={value.to ?? ""}
                className={cn(inputClassName, customInputClassName)}
                onBlur={field.onBlur}
                onChange={(event) =>
                  field.onChange({
                    ...value,
                    to: event.target.value,
                  })
                }
              />
            </div>
          </FieldShell>
        );
      }}
    />
  );
}
