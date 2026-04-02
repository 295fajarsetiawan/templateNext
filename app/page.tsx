import { DemoAdminDashboard } from "@/components/demo/demo-admin-dashboard";
import { DemoForm } from "@/components/demo/demo-form";
import { DemoTable } from "@/components/demo/demo-table";
import { DemoUmroh } from "@/components/demo/demo-umroh";
import { DemoUi } from "@/components/demo/demo-ui";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(161,161,170,0.16),_transparent_32%),linear-gradient(180deg,_#fafaf9_0%,_#f4f4f5_100%)] px-4 py-10 sm:px-6 lg:px-10 lg:py-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
        <section className="max-w-4xl">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-zinc-500">
            Component System
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
            Reusable UI, admin dashboard, dan website umroh untuk Next.js.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-600">
            Halaman ini berisi showcase komponen. Halaman nyata yang bisa langsung
            dipakai juga tersedia di <a className="font-semibold text-zinc-900 underline" href="/admin">/admin</a> dan{" "}
            <a className="font-semibold text-zinc-900 underline" href="/umroh">/umroh</a>.
          </p>
        </section>

        <DemoUi />
        <DemoUmroh />
        <DemoAdminDashboard />
        <DemoForm />
        <DemoTable />
      </div>
    </main>
  );
}
