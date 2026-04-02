"use client";

import { useId, useRef } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";

import { FieldShell, inputClassName } from "@/components/form/field-shell";
import { cn } from "@/lib/cn";

type OtpFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  length?: number;
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

export function OtpField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  length = 6,
  hint,
  required,
  disabled,
  className,
  inputClassName: customInputClassName,
  containerClassName,
  labelClassName,
  hintClassName,
  errorClassName,
}: OtpFieldProps<TFieldValues>) {
  const id = useId();
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const value = typeof field.value === "string" ? field.value : "";
        const digits = Array.from({ length }, (_, index) => value[index] ?? "");

        function updateOtp(nextDigits: string[]) {
          field.onChange(nextDigits.join(""));
        }

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
            <div className={cn("flex gap-2", containerClassName)}>
              {digits.map((digit, index) => (
                <input
                  key={`${id}-${index}`}
                  ref={(element) => {
                    inputsRef.current[index] = element;
                  }}
                  id={index === 0 ? id : undefined}
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  disabled={disabled}
                  className={cn(
                    inputClassName,
                    "w-12 text-center text-lg font-semibold",
                    customInputClassName
                  )}
                  onBlur={field.onBlur}
                  onChange={(event) => {
                    const nextChar = event.target.value.replace(/\D/g, "").slice(-1);
                    const nextDigits = [...digits];
                    nextDigits[index] = nextChar;
                    updateOtp(nextDigits);

                    if (nextChar && index < length - 1) {
                      inputsRef.current[index + 1]?.focus();
                    }
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Backspace" && !digits[index] && index > 0) {
                      inputsRef.current[index - 1]?.focus();
                    }
                  }}
                />
              ))}
            </div>
          </FieldShell>
        );
      }}
    />
  );
}
