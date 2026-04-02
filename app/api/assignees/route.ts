import { NextResponse } from "next/server";

const assignees = [
  { label: "Andi Saputra", value: "andi", description: "Frontend Engineer" },
  { label: "Bunga Lestari", value: "bunga", description: "Product Designer" },
  { label: "Cahyo Pratama", value: "cahyo", description: "Backend Engineer" },
  { label: "Dewi Anjani", value: "dewi", description: "Project Manager" },
  { label: "Eko Ramadhan", value: "eko", description: "QA Engineer" },
  { label: "Farah Nabila", value: "farah", description: "Data Analyst" },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.trim().toLowerCase() ?? "";

  const results = !query
    ? assignees
    : assignees.filter((item) => {
        return (
          item.label.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.value.toLowerCase().includes(query)
        );
      });

  return NextResponse.json(results);
}
