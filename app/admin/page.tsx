import type { Metadata } from "next";

import { AdminDashboardPage } from "@/components/admin/admin-dashboard-page";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Modern admin dashboard layout for analytics, users, and operations.",
};

export default function Page() {
  return <AdminDashboardPage />;
}
