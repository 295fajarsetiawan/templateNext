"use client";

import {
  DataTable,
  type DataTableRowAction,
  type DataTableColumn,
  type DataTableResponse,
} from "@/components/table/data-table";
import { demoUsers, type DemoUser } from "@/lib/demo-users";
import type { FormFieldConfig, SelectOption } from "@/components/form";

const userColumns: DataTableColumn<DemoUser>[] = [
  {
    key: "name",
    header: "Name",
    accessor: "name",
    cardTitle: true,
  },
  {
    key: "email",
    header: "Email",
    accessor: "email",
  },
  {
    key: "role",
    header: "Role",
    accessor: "role",
  },
  {
    key: "team",
    header: "Team",
    accessor: "team",
    defaultHidden: true,
  },
  {
    key: "city",
    header: "City",
    accessor: "city",
    defaultHidden: true,
  },
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
  {
    key: "joinedAt",
    header: "Joined",
    render: (row) => new Date(row.joinedAt).toLocaleDateString("en-US"),
    cardHidden: true,
  },
];

type UserTableFilters = {
  status: string;
  team: string;
};

const filterOptionsStatus: SelectOption[] = [
  { label: "All Status", value: "" },
  { label: "Active", value: "Active" },
  { label: "Pending", value: "Pending" },
  { label: "Suspended", value: "Suspended" },
];

const filterOptionsTeam: SelectOption[] = [
  { label: "All Team", value: "" },
  { label: "Platform", value: "Platform" },
  { label: "Core API", value: "Core API" },
  { label: "Experience", value: "Experience" },
  { label: "Quality", value: "Quality" },
  { label: "Analytics", value: "Analytics" },
  { label: "Infrastructure", value: "Infrastructure" },
  { label: "Delivery", value: "Delivery" },
  { label: "Mobile", value: "Mobile" },
  { label: "Growth", value: "Growth" },
  { label: "Security", value: "Security" },
  { label: "Payments", value: "Payments" },
];

const userFilterFields: FormFieldConfig<UserTableFilters>[] = [
  {
    kind: "select",
    name: "status",
    label: "Status",
    row: "filters",
    options: filterOptionsStatus,
    props: {
      searchable: true,
      placeholder: "Select status",
    },
  },
  {
    kind: "select",
    name: "team",
    label: "Team",
    row: "filters",
    options: filterOptionsTeam,
    props: {
      searchable: true,
      placeholder: "Select team",
    },
  },
];

const userFilterDefaultValues: UserTableFilters = {
  status: "",
  team: "",
};

const customActions: DataTableRowAction<DemoUser>[] = [
  {
    key: "copy-email",
    title: "Copy Email",
    icon: "copy",
    onClick: (row) => {
      console.log("copy email", row.email);
    },
  },
  {
    key: "send-mail",
    title: "Send Mail",
    icon: "mail",
    onClick: (row) => {
      console.log("send mail", row.email);
    },
  },
];

async function fetchUsers(params: {
  query: string;
  page: number;
  limit: number;
  filters: UserTableFilters;
}): Promise<DataTableResponse<DemoUser>> {
  const searchParams = new URLSearchParams();

  searchParams.set("query", params.query);
  searchParams.set("page", String(params.page));
  searchParams.set("limit", String(params.limit));

  if (params.filters.status) {
    searchParams.set("status", params.filters.status);
  }

  if (params.filters.team) {
    searchParams.set("team", params.filters.team);
  }

  const response = await fetch(`/api/users?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch users.");
  }

  return (await response.json()) as DataTableResponse<DemoUser>;
}

function localFilterUsers(row: DemoUser, filters: UserTableFilters) {
  const matchesStatus = !filters.status || row.status === filters.status;
  const matchesTeam = !filters.team || row.team === filters.team;
  return matchesStatus && matchesTeam;
}

export function DemoTable() {
  return (
    <div className="grid gap-8">
      <DataTable
        title="Local Search and Pagination"
        description="Mode ini memfilter dan paginate langsung di browser. Cocok untuk dataset kecil atau data yang sudah ada di halaman."
        columns={userColumns}
        rows={demoUsers}
        getRowId={(row) => row.id}
        searchKeys={["name", "email", "role", "team", "city", "status"]}
        initialLimit={5}
        filterFields={userFilterFields}
        filterDefaultValues={userFilterDefaultValues}
        filterFn={localFilterUsers}
        onDetail={(row) => console.log("detail", row)}
        onEdit={(row) => console.log("edit", row)}
        onDelete={(row) => console.log("delete", row)}
        actions={customActions}
      />

      <DataTable
        title="Server-side Search and Pagination"
        description="Mode ini mengirim query, page, dan limit ke server. Dropdown kolom tetap berjalan di client."
        columns={userColumns}
        getRowId={(row) => row.id}
        searchKeys={["name"]}
        serverSide
        fetchData={fetchUsers}
        initialLimit={5}
        filterFields={userFilterFields}
        filterDefaultValues={userFilterDefaultValues}
        onDetail={(row) => console.log("detail", row)}
        onEdit={(row) => console.log("edit", row)}
        onDelete={(row) => console.log("delete", row)}
        actions={customActions}
      />
    </div>
  );
}
