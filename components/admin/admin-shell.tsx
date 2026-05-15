"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

type AdminShellProps = {
  sidebar: React.ReactNode;
  header: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
};

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-5 w-5", className)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.8"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-5 w-5", className)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.8"
    >
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

export function AdminShell({
  sidebar,
  header,
  children,
  className,
  fullHeight = false,
}: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!sidebarOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [sidebarOpen]);

  if (!fullHeight) {
    return (
      <section className={cn("grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]", className)}>
        <div className="xl:sticky xl:top-6 xl:self-start">{sidebar}</div>
        <div className="grid gap-6">
          {header}
          {children}
        </div>
      </section>
    );
  }

  return (
    <section className={cn("min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)] xl:grid xl:grid-cols-[280px_minmax(0,1fr)]", className)}>
      <div className="hidden xl:sticky xl:top-0 xl:block xl:h-screen">{sidebar}</div>

      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200 bg-white/95 px-4 shadow-sm backdrop-blur xl:hidden">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-sky-600">
              Admin Kit
            </p>
            <h1 className="text-base font-bold tracking-tight text-zinc-950">Control Hub</h1>
          </div>
          <button
            type="button"
            aria-label="Show sidebar menu"
            aria-controls="admin-mobile-sidebar"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-900 shadow-sm transition hover:bg-zinc-50"
          >
            <MenuIcon />
          </button>
        </header>

        {header}

        <div className="grid gap-6 px-4 py-6 sm:px-6 lg:px-8 xl:py-8">
          {children}
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-40 xl:hidden",
          sidebarOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!sidebarOpen}
        inert={!sidebarOpen}
      >
        <button
          type="button"
          aria-label="Close sidebar menu"
          onClick={() => setSidebarOpen(false)}
          className={cn(
            "absolute inset-0 bg-slate-950/50 transition-opacity",
            sidebarOpen ? "opacity-100" : "opacity-0"
          )}
        />
        <div
          id="admin-mobile-sidebar"
          role="dialog"
          aria-modal="true"
          aria-label="Sidebar menu"
          className={cn(
            "absolute inset-y-0 left-0 w-[min(20rem,88vw)] bg-white text-zinc-950 shadow-[20px_0_60px_rgba(15,23,42,0.18)] transition-transform duration-300",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-full flex-col">
            <div className="flex justify-end p-3">
              <button
                type="button"
                aria-label="Close sidebar menu"
                onClick={() => setSidebarOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-900 transition hover:bg-zinc-50"
              >
                <CloseIcon />
              </button>
            </div>
            <div
              className="min-h-0 flex-1 overflow-y-auto px-3 pb-4"
              onClick={(event) => {
                if (event.target instanceof HTMLElement && event.target.closest("a")) {
                  setSidebarOpen(false);
                }
              }}
            >
              {sidebar}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
