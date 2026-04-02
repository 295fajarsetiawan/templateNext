"use client";

import {
  adminActivities,
  adminNavItems,
  adminQuickActions,
  adminStats,
  revenueSeries,
  type AdminQuickAction,
} from "@/lib/admin-dashboard";
import {
  AdminActivityFeed,
  AdminHeader,
  AdminQuickActions,
  AdminRevenuePanel,
  AdminShell,
  AdminSidebar,
  AdminStatCard,
} from "@/components/admin";
import { DataTable, type DataTableColumn } from "@/components/table/data-table";
import { demoUsers, type DemoUser } from "@/lib/demo-users";

const adminUserColumns: DataTableColumn<DemoUser>[] = [
  { key: "name", header: "Name", accessor: "name", cardTitle: true },
  { key: "email", header: "Email", accessor: "email" },
  { key: "role", header: "Role", accessor: "role" },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${
          row.status === "Active"
            ? "bg-emerald-100 text-emerald-700"
            : row.status === "Pending"
              ? "bg-amber-100 text-amber-700"
              : "bg-rose-100 text-rose-700"
        }`}
      >
        {row.status}
      </span>
    ),
  },
];

export function DemoAdminDashboard() {
  function handleQuickAction(action: AdminQuickAction) {
    console.log("admin action", action);
  }

  return (
    <section className="grid gap-8">
      <div className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-500">
          Admin Dashboard
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">
          Toolkit komponen dan lib untuk admin dashboard
        </h2>
        <p className="mt-3 text-sm leading-7 text-zinc-600">
          Komponen di bawah menunjukkan cara merakit layout admin, metrics,
          chart, quick actions, activity feed, dan table user.
        </p>
      </div>

      <AdminShell
        sidebar={<AdminSidebar items={adminNavItems} activeId="dashboard" />}
        header={
          <AdminHeader
            title="Business Overview"
            description="Track metrics, user activity, dan revenue performance harian."
          />
        }
      >
        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
          {adminStats.map((stat) => (
            <AdminStatCard key={stat.id} stat={stat} />
          ))}
        </div>

        <div className="grid gap-6 2xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)]">
          <AdminRevenuePanel data={revenueSeries} />
          <AdminQuickActions actions={adminQuickActions} onActionClick={handleQuickAction} />
        </div>

        <div className="grid gap-6 2xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <DataTable
            title="Latest Users"
            description="Contoh penggunaan data table di halaman admin."
            columns={adminUserColumns}
            rows={demoUsers}
            getRowId={(row) => row.id}
            searchKeys={["name", "email", "role", "status"]}
            initialLimit={5}
            onDetail={(row) => console.log("detail user", row)}
            onEdit={(row) => console.log("edit user", row)}
            onDelete={(row) => console.log("delete user", row)}
            className="shadow-none"
          />
          <AdminActivityFeed items={adminActivities} />
        </div>
      </AdminShell>
    </section>
  );
}
