import { cn } from "@/lib/cn";

type AdminShellProps = {
  sidebar: React.ReactNode;
  header: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function AdminShell({ sidebar, header, children, className }: AdminShellProps) {
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
