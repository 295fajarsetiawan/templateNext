"use client";

import type { Control, FieldValues, Path } from "react-hook-form";

import { CheckboxField } from "@/components/form/checkbox-field";
import { ColorPickerField } from "@/components/form/color-picker-field";
import { DateField } from "@/components/form/date-field";
import { DateRangeField } from "@/components/form/date-range-field";
import { DateTimeField } from "@/components/form/datetime-field";
import { FileUploadField } from "@/components/form/file-upload-field";
import { OtpField } from "@/components/form/otp-field";
import {
  RadioGroupField,
  type RadioOption,
} from "@/components/form/radio-group-field";
import { RangeSliderField } from "@/components/form/range-slider-field";
import { RatingField } from "@/components/form/rating-field";
import {
  SelectField,
  type SelectOption,
} from "@/components/form/select-field";
import { TextareaField } from "@/components/form/textarea-field";
import { TextField } from "@/components/form/text-field";
import { TimeField } from "@/components/form/time-field";
import { ToggleSwitchField } from "@/components/form/toggle-switch-field";
import { cn } from "@/lib/cn";

type RowKey = number | string;

type BaseFieldConfig<TFieldValues extends FieldValues> = {
  kind:
    | "text"
    | "textarea"
    | "otp"
    | "checkbox"
    | "select"
    | "radio"
    | "range"
    | "switch"
    | "rating"
    | "color"
    | "date"
    | "time"
    | "date-range"
    | "datetime"
    | "file";
  name: Path<TFieldValues>;
  label: string;
  row?: RowKey;
  hidden?: boolean;
  className?: string;
};

type TextLikeFieldConfig<TFieldValues extends FieldValues> = BaseFieldConfig<TFieldValues> & {
  kind: "text" | "textarea" | "otp" | "date" | "time" | "datetime";
  props?: Record<string, unknown>;
};

type CheckboxFieldConfig<TFieldValues extends FieldValues> = BaseFieldConfig<TFieldValues> & {
  kind: "checkbox" | "switch";
  props?: Record<string, unknown>;
};

type SelectFieldConfig<TFieldValues extends FieldValues> = BaseFieldConfig<TFieldValues> & {
  kind: "select";
  options?: SelectOption[];
  loadOptions?: (query: string) => Promise<SelectOption[]>;
  props?: Record<string, unknown>;
};

type RadioFieldConfig<TFieldValues extends FieldValues> = BaseFieldConfig<TFieldValues> & {
  kind: "radio";
  options: RadioOption[];
  props?: Record<string, unknown>;
};

type FileFieldConfig<TFieldValues extends FieldValues> = BaseFieldConfig<TFieldValues> & {
  kind: "file";
  props?: Record<string, unknown>;
};

type DateRangeFieldConfig<TFieldValues extends FieldValues> = BaseFieldConfig<TFieldValues> & {
  kind: "date-range";
  props?: Record<string, unknown>;
};

type RangeFieldConfig<TFieldValues extends FieldValues> = BaseFieldConfig<TFieldValues> & {
  kind: "range" | "rating" | "color";
  props?: Record<string, unknown>;
};

export type FormFieldConfig<TFieldValues extends FieldValues> =
  | TextLikeFieldConfig<TFieldValues>
  | CheckboxFieldConfig<TFieldValues>
  | SelectFieldConfig<TFieldValues>
  | RadioFieldConfig<TFieldValues>
  | FileFieldConfig<TFieldValues>
  | DateRangeFieldConfig<TFieldValues>
  | RangeFieldConfig<TFieldValues>;

type FormRendererProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  fields: FormFieldConfig<TFieldValues>[];
  rowClassName?: string;
  singleRowClassName?: string;
};

type GroupedFields<TFieldValues extends FieldValues> = {
  key: RowKey;
  fields: FormFieldConfig<TFieldValues>[];
};

function getColumnsClass(count: number) {
  if (count <= 1) {
    return "";
  }

  if (count === 2) {
    return "md:grid-cols-2";
  }

  if (count === 3) {
    return "md:grid-cols-3";
  }

  return "md:grid-cols-4";
}

function groupFieldsByRow<TFieldValues extends FieldValues>(
  fields: FormFieldConfig<TFieldValues>[]
) {
  const groups: GroupedFields<TFieldValues>[] = [];
  let autoRow = 0;

  for (const field of fields) {
    if (field.hidden) {
      continue;
    }

    const key = field.row ?? `auto-${autoRow++}`;
    const lastGroup = groups.at(-1);

    if (lastGroup && lastGroup.key === key) {
      lastGroup.fields.push(field);
      continue;
    }

    groups.push({
      key,
      fields: [field],
    });
  }

  return groups;
}

export function FormRenderer<TFieldValues extends FieldValues>({
  control,
  fields,
  rowClassName,
  singleRowClassName,
}: FormRendererProps<TFieldValues>) {
  const groups = groupFieldsByRow(fields);

  return (
    <>
      {groups.map((group) => {
        const isSingle = group.fields.length === 1;

        return (
          <div
            key={String(group.key)}
            className={cn(
              "grid gap-6",
              !isSingle && getColumnsClass(group.fields.length),
              isSingle && singleRowClassName,
              rowClassName
            )}
          >
            {group.fields.map((field) => (
              <FormFieldItem key={`${String(group.key)}-${field.name}`} control={control} field={field} />
            ))}
          </div>
        );
      })}
    </>
  );
}

function FormFieldItem<TFieldValues extends FieldValues>({
  control,
  field,
}: {
  control: Control<TFieldValues>;
  field: FormFieldConfig<TFieldValues>;
}) {
  switch (field.kind) {
    case "text":
      return (
        <TextField
          control={control}
          name={field.name}
          label={field.label}
          {...(field.props ?? {})}
        />
      );
    case "textarea":
      return (
        <TextareaField
          control={control}
          name={field.name}
          label={field.label}
          {...(field.props ?? {})}
        />
      );
    case "otp":
      return (
        <OtpField
          control={control}
          name={field.name}
          label={field.label}
          {...(field.props ?? {})}
        />
      );
    case "checkbox":
      return (
        <CheckboxField
          control={control}
          name={field.name}
          label={field.label}
          {...(field.props ?? {})}
        />
      );
    case "select":
      return (
        <SelectField
          control={control}
          name={field.name}
          label={field.label}
          options={field.options}
          loadOptions={field.loadOptions}
          {...(field.props ?? {})}
        />
      );
    case "radio":
      return (
        <RadioGroupField
          control={control}
          name={field.name}
          label={field.label}
          options={field.options}
          {...(field.props ?? {})}
        />
      );
    case "range":
      return (
        <RangeSliderField
          control={control}
          name={field.name}
          label={field.label}
          {...(field.props ?? {})}
        />
      );
    case "switch":
      return (
        <ToggleSwitchField
          control={control}
          name={field.name}
          label={field.label}
          {...(field.props ?? {})}
        />
      );
    case "rating":
      return (
        <RatingField
          control={control}
          name={field.name}
          label={field.label}
          {...(field.props ?? {})}
        />
      );
    case "color":
      return (
        <ColorPickerField
          control={control}
          name={field.name}
          label={field.label}
          {...(field.props ?? {})}
        />
      );
    case "date":
      return (
        <DateField
          control={control}
          name={field.name}
          label={field.label}
          {...(field.props ?? {})}
        />
      );
    case "time":
      return (
        <TimeField
          control={control}
          name={field.name}
          label={field.label}
          {...(field.props ?? {})}
        />
      );
    case "date-range":
      return (
        <DateRangeField
          control={control}
          name={field.name}
          label={field.label}
          {...(field.props ?? {})}
        />
      );
    case "datetime":
      return (
        <DateTimeField
          control={control}
          name={field.name}
          label={field.label}
          {...(field.props ?? {})}
        />
      );
    case "file":
      return (
        <FileUploadField
          control={control}
          name={field.name}
          label={field.label}
          {...(field.props ?? {})}
        />
      );
    default:
      return null;
  }
}
