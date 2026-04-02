"use client";

import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useId, useState } from "react";

import { cn } from "@/lib/cn";
import { FieldShell, inputClassName } from "@/components/form/field-shell";

type TextFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  type?: "text" | "email" | "password" | "number";
  allowPasswordToggle?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  hintClassName?: string;
  errorClassName?: string;
};

export function TextField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  hint,
  required,
  disabled,
  type = "text",
  allowPasswordToggle = false,
  className,
  inputClassName: customInputClassName,
  labelClassName,
  hintClassName,
  errorClassName,
}: TextFieldProps<TFieldValues>) {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  const inputType =
    type === "password" && allowPasswordToggle
      ? showPassword
        ? "text"
        : "password"
      : type;

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
          <div className="relative">
            <input
              {...field}
              id={id}
              type={inputType}
              inputMode={type === "number" ? "numeric" : undefined}
              placeholder={placeholder}
              disabled={disabled}
              value={field.value ?? ""}
              onChange={(event) => {
                const nextValue =
                  type === "number"
                    ? event.target.value === ""
                      ? ""
                      : Number(event.target.value)
                    : event.target.value;
                field.onChange(nextValue);
              }}
              className={cn(
                inputClassName,
                allowPasswordToggle ? "pr-14" : undefined,
                customInputClassName
              )}
            />
            {type === "password" && allowPasswordToggle ? (
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-xs font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950"
                onClick={() => setShowPassword((current) => !current)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            ) : null}
          </div>
        </FieldShell>
      )}
    />
  );
}
