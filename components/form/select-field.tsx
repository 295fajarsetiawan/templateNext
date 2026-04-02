"use client";

import {
  startTransition,
  useDeferredValue,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";

import {
  FieldShell,
  inputClassName,
  surfaceClassName,
} from "@/components/form/field-shell";
import { cn } from "@/lib/cn";

export type SelectOption = {
  label: string;
  value: string;
  description?: string;
};

const EMPTY_OPTIONS: SelectOption[] = [];

type SelectFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  hint?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  required?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  options?: SelectOption[];
  loadOptions?: (query: string) => Promise<SelectOption[]>;
  className?: string;
  triggerClassName?: string;
  panelClassName?: string;
  optionClassName?: string;
  labelClassName?: string;
  hintClassName?: string;
  errorClassName?: string;
};

export function SelectField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  hint,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  required,
  disabled,
  multiple = false,
  searchable = false,
  options = EMPTY_OPTIONS,
  loadOptions,
  className,
  triggerClassName,
  panelClassName,
  optionClassName,
  labelClassName,
  hintClassName,
  errorClassName,
}: SelectFieldProps<TFieldValues>) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const [asyncOptions, setAsyncOptions] = useState<SelectOption[]>(options);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setAsyncOptions(options);
  }, [options]);

  useEffect(() => {
    if (!loadOptions) {
      return;
    }

    let active = true;
    setIsLoading(true);

    const timeout = window.setTimeout(() => {
      void loadOptions(deferredSearch).then((nextOptions) => {
        if (!active) {
          return;
        }

        startTransition(() => {
          setAsyncOptions(nextOptions);
          setIsLoading(false);
        });
      });
    }, 250);

    return () => {
      active = false;
      window.clearTimeout(timeout);
    };
  }, [deferredSearch, loadOptions]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const visibleOptions = loadOptions
    ? asyncOptions
    : options.filter((option) => {
        if (!searchable || !deferredSearch.trim()) {
          return true;
        }

        const query = deferredSearch.toLowerCase();
        return (
          option.label.toLowerCase().includes(query) ||
          option.value.toLowerCase().includes(query)
        );
      });

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const selectedValues = multiple
          ? Array.isArray(field.value)
            ? (field.value as string[])
            : []
          : [];
        const selectedValue = !multiple && typeof field.value === "string" ? field.value : "";

        const selectedOptions = multiple
          ? visibleOptions.filter((option) => selectedValues.includes(option.value))
          : visibleOptions.filter((option) => option.value === selectedValue);

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
            <div className="relative" ref={rootRef}>
              <button
                id={id}
                type="button"
                disabled={disabled}
                className={cn(
                  inputClassName,
                  "flex items-center justify-between text-left",
                  !selectedOptions.length && "text-zinc-500",
                  triggerClassName
                )}
                onClick={() => setIsOpen((current) => !current)}
              >
                <span className="truncate">
                  {selectedOptions.length > 0
                    ? multiple
                      ? selectedOptions.map((option) => option.label).join(", ")
                      : selectedOptions[0]?.label
                    : placeholder}
                </span>
                <span className="text-xs text-zinc-400">{isOpen ? "Close" : "Open"}</span>
              </button>

              {multiple && selectedOptions.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedOptions.map((option) => (
                    <span
                      key={option.value}
                      className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700"
                    >
                      {option.label}
                    </span>
                  ))}
                </div>
              ) : null}

              {isOpen ? (
                <div
                  className={cn(
                    surfaceClassName,
                    "absolute z-20 mt-2 w-full overflow-hidden",
                    panelClassName
                  )}
                >
                  {searchable ? (
                    <div className="border-b border-zinc-200 p-2">
                      <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder={searchPlaceholder}
                        className={inputClassName}
                      />
                    </div>
                  ) : null}
                  <div className="max-h-64 overflow-y-auto p-2">
                    {isLoading ? (
                      <div className="px-3 py-8 text-center text-sm text-zinc-500">
                        Loading options...
                      </div>
                    ) : null}
                    {!isLoading && visibleOptions.length === 0 ? (
                      <div className="px-3 py-8 text-center text-sm text-zinc-500">
                        No options found.
                      </div>
                    ) : null}
                    {!isLoading
                      ? visibleOptions.map((option) => {
                          const isSelected = multiple
                            ? selectedValues.includes(option.value)
                            : selectedValue === option.value;

                          return (
                            <button
                              key={option.value}
                              type="button"
                              className={cn(
                                "flex w-full items-start justify-between rounded-xl px-3 py-3 text-left transition hover:bg-zinc-100",
                                isSelected && "bg-zinc-100",
                                optionClassName
                              )}
                              onClick={() => {
                                if (multiple) {
                                  const nextValue = isSelected
                                    ? selectedValues.filter((value) => value !== option.value)
                                    : [...selectedValues, option.value];
                                  field.onChange(nextValue);
                                  return;
                                }

                                field.onChange(option.value);
                                setIsOpen(false);
                              }}
                            >
                              <span className="flex flex-col">
                                <span className="text-sm font-medium text-zinc-900">
                                  {option.label}
                                </span>
                                {option.description ? (
                                  <span className="text-xs text-zinc-500">
                                    {option.description}
                                  </span>
                                ) : null}
                              </span>
                              <span className="text-xs text-zinc-400">
                                {isSelected ? "Selected" : ""}
                              </span>
                            </button>
                          );
                        })
                      : null}
                  </div>
                </div>
              ) : null}
            </div>
          </FieldShell>
        );
      }}
    />
  );
}
