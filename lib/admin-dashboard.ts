export type AdminNavItem = {
  id: string;
  label: string;
  icon: "dashboard" | "users" | "sales" | "orders" | "messages" | "settings";
  href?: string;
  badge?: string;
};

export type AdminStat = {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
};

export type AdminActivity = {
  id: string;
  title: string;
  description: string;
  time: string;
  tone?: "default" | "success" | "warning" | "danger";
};

export type AdminQuickAction = {
  id: string;
  label: string;
  description?: string;
  icon: "plus" | "download" | "mail" | "filter";
};

export type RevenuePoint = {
  label: string;
  value: number;
  color?: string;
};

export const adminNavItems: AdminNavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard", href: "#" },
  { id: "users", label: "Users", icon: "users", href: "#", badge: "1.2k" },
  { id: "sales", label: "Sales", icon: "sales", href: "#" },
  { id: "orders", label: "Orders", icon: "orders", href: "#", badge: "34" },
  { id: "messages", label: "Messages", icon: "messages", href: "#", badge: "8" },
  { id: "settings", label: "Settings", icon: "settings", href: "#" },
];

export const adminStats: AdminStat[] = [
  { id: "revenue", label: "Monthly Revenue", value: "$84,240", change: "+12.6%", trend: "up" },
  { id: "orders", label: "New Orders", value: "1,284", change: "+8.2%", trend: "up" },
  { id: "users", label: "Active Users", value: "24,891", change: "+4.1%", trend: "up" },
  { id: "refunds", label: "Refund Rate", value: "1.8%", change: "-0.3%", trend: "down" },
];

export const adminActivities: AdminActivity[] = [
  {
    id: "a1",
    title: "New enterprise plan purchased",
    description: "Acme Corp upgraded to Enterprise annual plan.",
    time: "5 min ago",
    tone: "success",
  },
  {
    id: "a2",
    title: "Payment review required",
    description: "Invoice INV-2084 flagged for manual verification.",
    time: "18 min ago",
    tone: "warning",
  },
  {
    id: "a3",
    title: "User suspended",
    description: "Account `user_4982` suspended due to policy violation.",
    time: "42 min ago",
    tone: "danger",
  },
  {
    id: "a4",
    title: "Weekly report generated",
    description: "Performance report for Q2 is ready to download.",
    time: "1 hour ago",
    tone: "default",
  },
];

export const adminQuickActions: AdminQuickAction[] = [
  { id: "create-user", label: "Create User", description: "Add team member", icon: "plus" },
  { id: "export", label: "Export Data", description: "CSV or PDF", icon: "download" },
  { id: "campaign", label: "Send Campaign", description: "Email blast", icon: "mail" },
  { id: "filters", label: "Advanced Filters", description: "Segment data", icon: "filter" },
];

export const revenueSeries: RevenuePoint[] = [
  { label: "Jan", value: 18, color: "#0f172a" },
  { label: "Feb", value: 24, color: "#1d4ed8" },
  { label: "Mar", value: 22, color: "#0ea5e9" },
  { label: "Apr", value: 31, color: "#10b981" },
  { label: "May", value: 29, color: "#f59e0b" },
  { label: "Jun", value: 35, color: "#ef4444" },
];
