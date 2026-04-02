"use client";

import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useId } from "react";

import { FieldShell, inputClassName } from "@/components/form/field-shell";
import { cn } from "@/lib/cn";

type FileUploadFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  accept?: string;
  multiple?: boolean;
  className?: string;
  inputClassName?: string;
  chipClassName?: string;
  labelClassName?: string;
  hintClassName?: string;
  errorClassName?: string;
};

export function FileUploadField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  hint,
  required,
  disabled,
  accept,
  multiple = false,
  className,
  inputClassName: customInputClassName,
  chipClassName,
  labelClassName,
  hintClassName,
  errorClassName,
}: FileUploadFieldProps<TFieldValues>) {
  const id = useId();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const files = Array.isArray(field.value) ? field.value : [];

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
            <input
              id={id}
              type="file"
              accept={accept}
              multiple={multiple}
              disabled={disabled}
              className={cn(
                inputClassName,
                "file:mr-4 file:rounded-full file:border-0 file:bg-zinc-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white",
                customInputClassName
              )}
              onBlur={field.onBlur}
              onChange={(event) => {
                const nextFiles = Array.from(event.target.files ?? []);
                field.onChange(nextFiles);
              }}
            />
            {files.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {files.map((file: File) => (
                  <li
                    key={`${file.name}-${file.size}`}
                    className={cn(
                      "rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700",
                      chipClassName
                    )}
                  >
                    {file.name}
                  </li>
                ))}
              </ul>
            ) : null}
          </FieldShell>
        );
      }}
    />
  );
}
