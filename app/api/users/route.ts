import { NextResponse } from "next/server";

import { demoUsers } from "@/lib/demo-users";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.trim().toLowerCase() ?? "";
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "5");
  const status = searchParams.get("status") ?? "";
  const team = searchParams.get("team") ?? "";

  const searched = !query
    ? demoUsers
    : demoUsers.filter((user) => {
        return (
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.role.toLowerCase().includes(query) ||
          user.team.toLowerCase().includes(query) ||
          user.city.toLowerCase().includes(query) ||
          user.status.toLowerCase().includes(query)
        );
      });

  const filtered = searched.filter((user) => {
    const matchesStatus = !status || user.status === status;
    const matchesTeam = !team || user.team === team;
    return matchesStatus && matchesTeam;
  });

  const safePage = Number.isFinite(page) && page > 0 ? page : 1;
  const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 5;
  const start = (safePage - 1) * safeLimit;

  return NextResponse.json({
    rows: filtered.slice(start, start + safeLimit),
    total: filtered.length,
    page: safePage,
    limit: safeLimit,
  });
}
