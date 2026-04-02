"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import {
  FormRenderer,
  type FormFieldConfig,
  type RadioOption,
  type SelectOption,
} from "@/components/form";

const countryOptions: SelectOption[] = [
  { label: "Indonesia", value: "id", description: "Asia Pacific" },
  { label: "Singapore", value: "sg", description: "Asia Pacific" },
  { label: "Japan", value: "jp", description: "East Asia" },
  { label: "Germany", value: "de", description: "Europe" },
  { label: "United States", value: "us", description: "North America" },
];

const skillsOptions: SelectOption[] = [
  { label: "React", value: "react" },
  { label: "Next.js", value: "nextjs" },
  { label: "TypeScript", value: "typescript" },
  { label: "Node.js", value: "nodejs" },
  { label: "Tailwind CSS", value: "tailwind" },
  { label: "PostgreSQL", value: "postgresql" },
];

const contactOptions: RadioOption[] = [
  { label: "Email", value: "email", description: "Kontak utama lewat email" },
  { label: "WhatsApp", value: "whatsapp", description: "Kontak utama lewat WhatsApp" },
  { label: "Telegram", value: "telegram", description: "Kontak utama lewat Telegram" },
];

const formSchema = z.object({
  fullName: z.string().min(3, "Nama minimal 3 karakter."),
  email: z.email("Email tidak valid."),
  password: z.string().min(8, "Password minimal 8 karakter."),
  bio: z.string().min(10, "Bio minimal 10 karakter."),
  otp: z.string().length(6, "OTP harus 6 digit."),
  age: z
    .number({ error: "Umur wajib diisi." })
    .min(17, "Umur minimal 17 tahun."),
  agreeToTerms: z.boolean().refine((value) => value, {
    message: "Kamu harus menyetujui syarat.",
  }),
  notificationsEnabled: z.boolean(),
  preferredContact: z.string().min(1, "Pilih satu metode kontak."),
  experienceLevel: z.number().min(0).max(100),
  satisfaction: z.number().min(1, "Pilih rating minimal 1."),
  favoriteColor: z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "Warna tidak valid."),
  birthDate: z.string().min(1, "Pilih tanggal lahir."),
  availableTime: z.string().min(1, "Pilih waktu tersedia."),
  vacationRange: z
    .object({
      from: z.string().min(1, "Tanggal mulai wajib diisi."),
      to: z.string().min(1, "Tanggal selesai wajib diisi."),
    })
    .refine((value) => value.from <= value.to, {
      message: "Tanggal selesai harus setelah tanggal mulai.",
    }),
  country: z.string().min(1, "Pilih satu negara."),
  assignee: z.string().min(1, "Pilih satu assignee."),
  skills: z.array(z.string()).min(1, "Pilih minimal satu skill."),
  meetingAt: z.string().min(1, "Pilih jadwal meeting."),
  attachments: z
    .array(z.instanceof(File))
    .min(1, "Upload minimal satu file."),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
  fullName: "",
  email: "",
  password: "",
  bio: "",
  otp: "",
  age: 17,
  agreeToTerms: false,
  notificationsEnabled: true,
  preferredContact: "",
  experienceLevel: 40,
  satisfaction: 3,
  favoriteColor: "#171717",
  birthDate: "",
  availableTime: "",
  vacationRange: {
    from: "",
    to: "",
  },
  country: "",
  assignee: "",
  skills: [],
  meetingAt: "",
  attachments: [],
};

async function searchSkills(query: string) {
  await new Promise((resolve) => setTimeout(resolve, 350));

  if (!query.trim()) {
    return skillsOptions;
  }

  const normalizedQuery = query.toLowerCase();
  return skillsOptions.filter((option) =>
    option.label.toLowerCase().includes(normalizedQuery)
  );
}

async function searchAssignees(query: string) {
  const params = new URLSearchParams();

  if (query.trim()) {
    params.set("query", query);
  }

  const response = await fetch(`/api/assignees?${params.toString()}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch assignees.");
  }

  return (await response.json()) as SelectOption[];
}

const formFields: FormFieldConfig<FormValues>[] = [
  {
    kind: "text",
    name: "fullName",
    label: "Full name",
    row: "identity",
    props: {
      placeholder: "Nama lengkap",
      required: true,
      inputClassName: "rounded-[1.5rem]",
    },
  },
  {
    kind: "text",
    name: "email",
    label: "Email",
    row: "identity",
    props: {
      type: "email",
      placeholder: "nama@domain.com",
      required: true,
    },
  },
  {
    kind: "textarea",
    name: "bio",
    label: "Bio",
    props: {
      placeholder: "Ceritakan singkat tentang profile kamu",
      hint: "Contoh textarea dengan styling default yang bisa dioverride.",
      required: true,
    },
  },
  {
    kind: "text",
    name: "password",
    label: "Password",
    row: "security",
    props: {
      type: "password",
      allowPasswordToggle: true,
      placeholder: "Masukkan password",
      required: true,
    },
  },
  {
    kind: "text",
    name: "age",
    label: "Age",
    row: "security",
    props: {
      type: "number",
      placeholder: "17",
      required: true,
    },
  },
  {
    kind: "otp",
    name: "otp",
    label: "OTP code",
    props: {
      hint: "Input OTP 6 digit.",
      required: true,
      inputClassName: "rounded-xl border-zinc-300",
    },
  },
  {
    kind: "checkbox",
    name: "agreeToTerms",
    label: "Saya menyetujui syarat dan kebijakan",
    props: {
      description: "Contoh checkbox yang langsung terhubung ke boolean field.",
    },
  },
  {
    kind: "switch",
    name: "notificationsEnabled",
    label: "Aktifkan notifikasi",
    props: {
      description: "Contoh toggle switch boolean.",
    },
  },
  {
    kind: "radio",
    name: "preferredContact",
    label: "Preferred contact",
    options: contactOptions,
    props: {
      hint: "Contoh radio button group.",
      required: true,
    },
  },
  {
    kind: "range",
    name: "experienceLevel",
    label: "Experience level",
    row: "feedback",
    props: {
      min: 0,
      max: 100,
      step: 5,
      hint: "Range slider 0 sampai 100.",
      required: true,
    },
  },
  {
    kind: "rating",
    name: "satisfaction",
    label: "Satisfaction rating",
    row: "feedback",
    props: {
      hint: "Contoh rating 1 sampai 5.",
      required: true,
    },
  },
  {
    kind: "color",
    name: "favoriteColor",
    label: "Favorite color",
    row: "schedule-a",
    props: {
      hint: "Contoh color picker.",
      required: true,
    },
  },
  {
    kind: "date",
    name: "birthDate",
    label: "Birth date",
    row: "schedule-a",
    props: {
      hint: "Contoh date picker.",
      required: true,
    },
  },
  {
    kind: "time",
    name: "availableTime",
    label: "Available time",
    row: "schedule-b",
    props: {
      hint: "Contoh time picker.",
      required: true,
    },
  },
  {
    kind: "date-range",
    name: "vacationRange",
    label: "Vacation range",
    row: "schedule-b",
    props: {
      hint: "Contoh date range picker sederhana.",
      required: true,
    },
  },
  {
    kind: "select",
    name: "country",
    label: "Country",
    row: "select-a",
    options: countryOptions,
    props: {
      placeholder: "Pilih negara",
      searchable: true,
      hint: "Single select dengan autocomplete lokal.",
      required: true,
    },
  },
  {
    kind: "select",
    name: "assignee",
    label: "Assignee",
    row: "select-a",
    loadOptions: searchAssignees,
    props: {
      placeholder: "Cari assignee",
      searchPlaceholder: "Type untuk search server...",
      searchable: true,
      hint: "Contoh server-side search via route handler.",
      required: true,
    },
  },
  {
    kind: "select",
    name: "skills",
    label: "Skills",
    loadOptions: searchSkills,
    props: {
      placeholder: "Pilih skill",
      searchPlaceholder: "Cari skill...",
      searchable: true,
      multiple: true,
      hint: "Multiple select dengan async query lokal.",
      required: true,
    },
  },
  {
    kind: "datetime",
    name: "meetingAt",
    label: "Meeting time",
    row: "final",
    props: {
      hint: "Memakai input datetime-local.",
      required: true,
    },
  },
  {
    kind: "file",
    name: "attachments",
    label: "Attachments",
    row: "final",
    props: {
      hint: "Support single atau multiple file upload.",
      accept: ".pdf,.png,.jpg,.jpeg",
      multiple: true,
      required: true,
    },
  },
];

export function DemoForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const submittedData = useWatch({
    control: form.control,
  });

  async function onSubmit(values: FormValues) {
    console.log("submitted", values);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
      <section className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-8">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-500">
            React Hook Form + Zod
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">
            Form components reusable
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600">
            Semua field di bawah sudah connect ke react-hook-form dan validasi
            memakai schema Zod.
          </p>
        </div>

        <form
          className="grid gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormRenderer control={form.control} fields={formFields} />

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              Submit form
            </button>
            <button
              type="button"
              className="rounded-full border border-zinc-200 px-5 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
              onClick={() => form.reset(defaultValues)}
            >
              Reset
            </button>
          </div>
        </form>
      </section>

      <aside className="rounded-[2rem] border border-zinc-200 bg-zinc-950 p-6 text-zinc-100 shadow-[0_20px_60px_rgba(24,24,27,0.24)]">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-400">
          Live values
        </p>
        <pre className="mt-4 overflow-x-auto text-xs leading-6 text-zinc-200">
          {JSON.stringify(submittedData, null, 2)}
        </pre>
      </aside>
    </div>
  );
}
