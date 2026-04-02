"use client";

import { createContext, useContext, useMemo, useState } from "react";

import { cn } from "@/lib/cn";

type Toast = {
  id: number;
  title: string;
  description?: string;
};

type SonnerContextValue = {
  push: (toast: Omit<Toast, "id">) => void;
};

const SonnerContext = createContext<SonnerContextValue | null>(null);

export function SonnerProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const value = useMemo<SonnerContextValue>(
    () => ({
      push: (toast) => {
        const id = Date.now();
        setToasts((current) => [...current, { ...toast, id }]);
        window.setTimeout(() => {
          setToasts((current) => current.filter((item) => item.id !== id));
        }, 3000);
      },
    }),
    []
  );

  return (
    <SonnerContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 grid gap-3">
        {toasts.map((toast) => (
          <div key={toast.id} className={cn("rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-lg")}>
            <p className="text-sm font-semibold text-zinc-950">{toast.title}</p>
            {toast.description ? <p className="mt-1 text-sm text-zinc-500">{toast.description}</p> : null}
          </div>
        ))}
      </div>
    </SonnerContext.Provider>
  );
}

export function useSonner() {
  const context = useContext(SonnerContext);

  if (!context) {
    throw new Error("useSonner must be used inside SonnerProvider");
  }

  return context;
}
