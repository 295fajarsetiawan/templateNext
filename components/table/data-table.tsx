"use client";

import { startTransition, useDeferredValue, useEffect, useId, useMemo, useState } from "react";
import type { DefaultValues, FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";

import {
  FormRenderer,
  type FormFieldConfig,
} from "@/components/form";
import { cn } from "@/lib/cn";

export type DataTableColumn<TRow> = {
  key: string;
  header: string;
  accessor?: keyof TRow;
  render?: (row: TRow) => React.ReactNode;
  cardTitle?: boolean;
  cardHidden?: boolean;
  defaultHidden?: boolean;
  className?: string;
};

type DataTableActionIconName =
  | "detail"
  | "edit"
  | "delete"
  | "copy"
  | "download"
  | "mail"
  | "eye"
  | "archive";

export type DataTableRowAction<TRow> = {
  key: string;
  title: string;
  icon: DataTableActionIconName;
  onClick: (row: TRow) => void;
  variant?: "default" | "danger";
};

export type DataTableResponse<TRow> = {
  rows: TRow[];
  total: number;
  page: number;
  limit: number;
};

type DataTableFetchParams<TFilters extends FieldValues> = {
  query: string;
  page: number;
  limit: number;
  filters: TFilters;
};

type DataTableProps<TRow, TFilters extends FieldValues = Record<string, never>> = {
  title: string;
  description?: string;
  columns: DataTableColumn<TRow>[];
  rows?: TRow[];
  getRowId: (row: TRow) => string | number;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchKeys?: Array<keyof TRow>;
  serverSide?: boolean;
  fetchData?: (params: DataTableFetchParams<TFilters>) => Promise<DataTableResponse<TRow>>;
  initialLimit?: number;
  limitOptions?: number[];
  className?: string;
  filterFields?: FormFieldConfig<TFilters>[];
  filterDefaultValues?: DefaultValues<TFilters>;
  filterFn?: (row: TRow, filters: TFilters) => boolean;
  onDetail?: (row: TRow) => void;
  onEdit?: (row: TRow) => void;
  onDelete?: (row: TRow) => void;
  actions?: DataTableRowAction<TRow>[];
};

const DEFAULT_LIMIT_OPTIONS = [5, 10, 20];

function ColumnsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="5" height="14" rx="1.5" />
      <rect x="10" y="5" width="5" height="14" rx="1.5" />
      <rect x="17" y="5" width="4" height="14" rx="1.5" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 6h16" />
      <path d="M7 12h10" />
      <path d="M10 18h4" />
    </svg>
  );
}

function DetailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 20h4l10-10-4-4L4 16v4Z" />
      <path d="m13 7 4 4" />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 7h16" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M6 7l1 12h10l1-12" />
      <path d="M9 7V4h6v3" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="9" y="9" width="10" height="10" rx="2" />
      <path d="M5 15V7a2 2 0 0 1 2-2h8" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 4v10" />
      <path d="m8 10 4 4 4-4" />
      <path d="M4 20h16" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function ArchiveIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="4" rx="1" />
      <path d="M5 9h14v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9Z" />
      <path d="M10 13h4" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <circle cx="6" cy="12" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="18" cy="12" r="1.8" />
    </svg>
  );
}

function ActionIcon({ icon }: { icon: DataTableActionIconName }) {
  switch (icon) {
    case "detail":
    case "eye":
      return <DetailIcon />;
    case "edit":
      return <EditIcon />;
    case "delete":
      return <DeleteIcon />;
    case "copy":
      return <CopyIcon />;
    case "download":
      return <DownloadIcon />;
    case "mail":
      return <MailIcon />;
    case "archive":
      return <ArchiveIcon />;
    default:
      return <DetailIcon />;
  }
}

function getCellValue<TRow>(row: TRow, column: DataTableColumn<TRow>) {
  if (column.render) {
    return column.render(row);
  }

  if (!column.accessor) {
    return null;
  }

  return row[column.accessor] as React.ReactNode;
}

export function DataTable<TRow, TFilters extends FieldValues = Record<string, never>>({
  title,
  description,
  columns,
  rows = [],
  getRowId,
  searchable = true,
  searchPlaceholder = "Search...",
  searchKeys = [],
  serverSide = false,
  fetchData,
  initialLimit = 5,
  limitOptions = DEFAULT_LIMIT_OPTIONS,
  className,
  filterFields = [],
  filterDefaultValues,
  filterFn,
  onDetail,
  onEdit,
  onDelete,
  actions = [],
}: DataTableProps<TRow, TFilters>) {
  const menuId = useId();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const [isColumnMenuOpen, setIsColumnMenuOpen] = useState(false);
  const [isPageMenuOpen, setIsPageMenuOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [openActionMenuRow, setOpenActionMenuRow] = useState<string | number | null>(null);
  const [hiddenColumns, setHiddenColumns] = useState<string[]>(
    columns.filter((column) => column.defaultHidden).map((column) => column.key)
  );
  const [serverRows, setServerRows] = useState<TRow[]>(rows);
  const [serverTotal, setServerTotal] = useState(rows.length);
  const [isLoading, setIsLoading] = useState(serverSide);
  const [appliedFilters, setAppliedFilters] = useState<TFilters>(
    ((filterDefaultValues ?? {}) as TFilters)
  );

  const filterForm = useForm<TFilters>({
    defaultValues: filterDefaultValues,
  });

  useEffect(() => {
    if (!serverSide || !fetchData) {
      return;
    }

    let active = true;

    void fetchData({
      query: deferredQuery,
      page,
      limit,
      filters: appliedFilters,
    }).then((result) => {
      if (!active) {
        return;
      }

      startTransition(() => {
        setServerRows(result.rows);
        setServerTotal(result.total);
        setIsLoading(false);
      });
    });

    return () => {
      active = false;
    };
  }, [appliedFilters, deferredQuery, fetchData, limit, page, serverSide]);

  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const localFilteredRows = !serverSide
    ? rows.filter((row) => {
        const passesSearch =
          !normalizedQuery ||
          searchKeys.some((key) => {
            const value = row[key];
            return String(value ?? "").toLowerCase().includes(normalizedQuery);
          });

        if (!passesSearch) {
          return false;
        }

        if (!filterFn) {
          return true;
        }

        return filterFn(row, appliedFilters);
      })
    : [];

  const totalRows = serverSide ? serverTotal : localFilteredRows.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / limit));
  const currentPage = Math.min(page, totalPages);
  const paginatedLocalRows = !serverSide
    ? localFilteredRows.slice((currentPage - 1) * limit, currentPage * limit)
    : [];
  const activeRows = serverSide ? serverRows : paginatedLocalRows;
  const visibleColumns = columns.filter((column) => !hiddenColumns.includes(column.key));
  const pageItems = Array.from({ length: totalPages }, (_, index) => index + 1);
  const hasFilters = filterFields.length > 0;
  const builtInActions: DataTableRowAction<TRow>[] = [
    ...(onDetail
      ? [{ key: "detail", title: "Detail", icon: "detail" as const, onClick: onDetail }]
      : []),
    ...(onEdit
      ? [{ key: "edit", title: "Edit", icon: "edit" as const, onClick: onEdit }]
      : []),
    ...(onDelete
      ? [
          {
            key: "delete",
            title: "Delete",
            icon: "delete" as const,
            onClick: onDelete,
            variant: "danger" as const,
          },
        ]
      : []),
  ];
  const rowActions = [...builtInActions, ...actions];
  const hasRowActions = rowActions.length > 0;
  const useActionDropdown = rowActions.length > 3;
  const appliedFilterCount = useMemo(() => {
    return Object.values(appliedFilters ?? {}).filter((value) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }

      if (value && typeof value === "object") {
        return Object.values(value).some(Boolean);
      }

      return value !== "" && value !== false && value != null;
    }).length;
  }, [appliedFilters]);

  function toggleColumn(key: string) {
    setHiddenColumns((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key]
    );
  }

  function handleSearchChange(value: string) {
    if (serverSide) {
      setIsLoading(true);
    }

    setQuery(value);
    setPage(1);
  }

  function handleLimitChange(value: number) {
    if (serverSide) {
      setIsLoading(true);
    }

    setLimit(value);
    setPage(1);
  }

  function handlePageChange(nextPage: number) {
    if (serverSide) {
      setIsLoading(true);
    }

    setPage(nextPage);
    setIsPageMenuOpen(false);
  }

  function handleApplyFilters(values: TFilters) {
    if (serverSide) {
      setIsLoading(true);
    }

    setAppliedFilters(values);
    setPage(1);
    setIsFilterModalOpen(false);
  }

  function handleResetFilters() {
    const resetValues = (filterDefaultValues ?? {}) as TFilters;

    filterForm.reset(filterDefaultValues);
    setAppliedFilters(resetValues);
    setPage(1);
    if (serverSide) {
      setIsLoading(true);
    }
  }

  function renderRowActions(row: TRow) {
    const rowId = getRowId(row);

    if (!useActionDropdown) {
      return (
        <div className="flex justify-end gap-2">
          {rowActions.map((action) => (
            <button
              key={action.key}
              type="button"
              onClick={() => action.onClick(row)}
              title={action.title}
              aria-label={action.title}
              className={cn(
                "rounded-xl border p-2 transition",
                action.variant === "danger"
                  ? "border-rose-200 text-rose-600 hover:bg-rose-50"
                  : "border-zinc-200 text-zinc-700 hover:bg-zinc-50"
              )}
            >
              <ActionIcon icon={action.icon} />
            </button>
          ))}
        </div>
      );
    }

    return (
      <div className="relative flex justify-end">
        <button
          type="button"
          onClick={() =>
            setOpenActionMenuRow((current) => (current === rowId ? null : rowId))
          }
          aria-label="Open row actions"
          title="Open row actions"
          className="rounded-xl border border-zinc-200 p-2 text-zinc-700 transition hover:bg-zinc-50"
        >
          <MoreIcon />
        </button>
        {openActionMenuRow === rowId ? (
          <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-2xl border border-zinc-200 bg-white p-2 shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
            <div className="grid gap-1">
              {rowActions.map((action) => (
                <button
                  key={action.key}
                  type="button"
                  onClick={() => {
                    action.onClick(row);
                    setOpenActionMenuRow(null);
                  }}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition",
                    action.variant === "danger"
                      ? "text-rose-600 hover:bg-rose-50"
                      : "text-zinc-700 hover:bg-zinc-50"
                  )}
                >
                  <ActionIcon icon={action.icon} />
                  <span>{action.title}</span>
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <>
      <section
        className={cn(
          "rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-8",
          className
        )}
      >
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-500">
              Data table
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">
              {title}
            </h2>
            {description ? (
              <p className="mt-3 text-sm leading-7 text-zinc-600">{description}</p>
            ) : null}
          </div>

          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto_auto]">
            {searchable ? (
              <input
                value={query}
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder={searchPlaceholder}
                className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-zinc-400 focus:ring-4 focus:ring-zinc-200/60"
              />
            ) : null}

            <select
              value={String(limit)}
              onChange={(event) => handleLimitChange(Number(event.target.value))}
              className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-zinc-400 focus:ring-4 focus:ring-zinc-200/60"
            >
              {limitOptions.map((option) => (
                <option key={option} value={option}>
                  {option} / page
                </option>
              ))}
            </select>

            {hasFilters ? (
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(true)}
                className="relative rounded-2xl border border-zinc-200 bg-white p-3 text-zinc-700 transition hover:bg-zinc-50"
                aria-label="Open filters"
              >
                <FilterIcon />
                {appliedFilterCount > 0 ? (
                  <span className="absolute -right-1 -top-1 rounded-full bg-zinc-950 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    {appliedFilterCount}
                  </span>
                ) : null}
              </button>
            ) : null}

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsColumnMenuOpen((current) => !current)}
                className="rounded-2xl border border-zinc-200 bg-white p-3 text-zinc-700 transition hover:bg-zinc-50"
                aria-label="Toggle columns"
              >
                <ColumnsIcon />
              </button>
              {isColumnMenuOpen ? (
                <div
                  id={menuId}
                  className="absolute right-0 z-20 mt-2 w-64 rounded-2xl border border-zinc-200 bg-white p-3 shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
                >
                  <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    Visible Columns
                  </div>
                  <div className="grid gap-2">
                    {columns.map((column) => {
                      const visible = !hiddenColumns.includes(column.key);

                      return (
                        <label
                          key={column.key}
                          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
                        >
                          <input
                            type="checkbox"
                            checked={visible}
                            onChange={() => toggleColumn(column.key)}
                          />
                          <span>{column.header}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-zinc-200">
          <div className="hidden overflow-x-auto xl:block">
            <table className="min-w-full border-collapse">
              <thead className="bg-zinc-50">
                <tr>
                  {visibleColumns.map((column) => (
                    <th
                      key={column.key}
                      className={cn(
                        "border-b border-zinc-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500",
                        column.className
                      )}
                    >
                      {column.header}
                    </th>
                  ))}
                  {hasRowActions ? (
                    <th className="border-b border-zinc-200 px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                      Actions
                    </th>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {activeRows.map((row) => (
                  <tr key={String(getRowId(row))} className="odd:bg-white even:bg-zinc-50/40">
                    {visibleColumns.map((column) => (
                      <td
                        key={column.key}
                        className={cn(
                          "border-b border-zinc-100 px-4 py-4 text-sm text-zinc-700",
                          column.className
                        )}
                      >
                        {getCellValue(row, column)}
                      </td>
                    ))}
                    {hasRowActions ? (
                      <td className="border-b border-zinc-100 px-4 py-4">
                        {renderRowActions(row)}
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 p-4 xl:hidden">
            {activeRows.map((row) => {
              const titleColumn =
                visibleColumns.find((column) => column.cardTitle) ?? visibleColumns[0];

              return (
                <article
                  key={String(getRowId(row))}
                  className="rounded-[1.5rem] border border-zinc-200 bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
                >
                  <h3 className="text-base font-semibold text-zinc-950">
                    {titleColumn ? getCellValue(row, titleColumn) : null}
                  </h3>
                  <dl className="mt-4 grid gap-3">
                    {visibleColumns
                      .filter((column) => !column.cardHidden && column.key !== titleColumn?.key)
                      .map((column) => (
                        <div
                          key={column.key}
                          className="flex items-start justify-between gap-4 border-b border-zinc-100 pb-3 last:border-b-0 last:pb-0"
                        >
                          <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                            {column.header}
                          </dt>
                          <dd className="text-right text-sm text-zinc-700">
                            {getCellValue(row, column)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  {hasRowActions ? (
                    <div className="mt-4">{renderRowActions(row)}</div>
                  ) : null}
                </article>
              );
            })}
          </div>

          {isLoading ? (
            <div className="border-t border-zinc-200 px-4 py-10 text-center text-sm text-zinc-500">
              Loading data...
            </div>
          ) : null}

          {!isLoading && activeRows.length === 0 ? (
            <div className="border-t border-zinc-200 px-4 py-10 text-center text-sm text-zinc-500">
              No data found.
            </div>
          ) : null}
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-zinc-500">
            Showing {activeRows.length} of {totalRows} rows
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Prev
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsPageMenuOpen((current) => !current)}
                className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
              >
                {currentPage} / {totalPages}
              </button>
              {isPageMenuOpen ? (
                <div className="absolute bottom-full left-1/2 z-20 mb-2 max-h-56 w-24 -translate-x-1/2 overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-2 shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
                  <div className="grid gap-1">
                    {pageItems.map((pageNumber) => (
                      <button
                        key={pageNumber}
                        type="button"
                        onClick={() => handlePageChange(pageNumber)}
                        className={cn(
                          "rounded-xl px-3 py-2 text-sm font-medium transition",
                          pageNumber === currentPage
                            ? "bg-zinc-950 text-white"
                            : "text-zinc-700 hover:bg-zinc-50"
                        )}
                      >
                        {pageNumber}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </section>

      {isFilterModalOpen ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/35 p-4">
          <div className="w-full max-w-3xl rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-[0_30px_80px_rgba(0,0,0,0.18)] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-500">
                  Filters
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">
                  Refine table results
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="rounded-full border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
              >
                Close
              </button>
            </div>

            <form className="mt-6 grid gap-6" onSubmit={filterForm.handleSubmit(handleApplyFilters)}>
              <FormRenderer control={filterForm.control} fields={filterFields} />

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
                >
                  Apply filters
                </button>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="rounded-full border border-zinc-200 px-5 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
                >
                  Reset filters
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
