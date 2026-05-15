"use client";

import {
  adminActivities,
  adminNavGroups,
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
import type { DemoUser } from "@/lib/demo-users";
import { useAdminUsersStore } from "@/stores/admin-users-store";

const adminUserColumns: DataTableColumn<DemoUser>[] = [
  { key: "name", header: "Name", accessor: "name", cardTitle: true },
  { key: "email", header: "Email", accessor: "email" },
  { key: "role", header: "Role", accessor: "role" },
  { key: "team", header: "Team", accessor: "team", defaultHidden: true },
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

export function AdminDashboardPage() {
  const fetchUsers = useAdminUsersStore((state) => state.fetchUsers);
  const usersError = useAdminUsersStore((state) => state.error);

  function handleQuickAction(action: AdminQuickAction) {
    console.log("admin action", action);
  }

  return (
    <AdminShell
      fullHeight
      sidebar={<AdminSidebar groups={adminNavGroups} activeId="dashboard" fullHeight />}
      header={
        <AdminHeader
          sticky
          title="Business Overview"
          description="Track metrics, user activity, revenue performance, dan order terbaru dalam satu tempat."
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
        <div className="grid gap-3">
          {usersError ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
              {usersError}
            </div>
          ) : null}
          <DataTable
            title="Latest Users"
            description="Monitor user growth, account status, dan tindakan cepat dari dashboard admin."
            columns={adminUserColumns}
            serverSide
            fetchData={fetchUsers}
            getRowId={(row) => row.id}
            searchKeys={["name", "email", "role", "status", "team"]}
            initialLimit={5}
            onDetail={(row) => console.log("detail user", row)}
            onEdit={(row) => console.log("edit user", row)}
            onDelete={(row) => console.log("delete user", row)}
            className="shadow-none"
          />
        </div>
        <AdminActivityFeed items={adminActivities} />
      </div>
    </AdminShell>
  );
}
