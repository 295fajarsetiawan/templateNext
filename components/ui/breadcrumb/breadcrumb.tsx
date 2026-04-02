import { cn } from "@/lib/cn";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
};

export function Breadcrumb({ items, separator = "/", className }: BreadcrumbProps) {
  return (
    <nav className={cn("flex flex-wrap items-center gap-2 text-sm text-zinc-500", className)}>
      {items.map((item, index) => (
        <div key={`${item.label}-${index}`} className="flex items-center gap-2">
          {item.href ? (
            <a href={item.href} className="transition hover:text-zinc-900">
              {item.label}
            </a>
          ) : (
            <span className="font-medium text-zinc-900">{item.label}</span>
          )}
          {index < items.length - 1 ? <span>{separator}</span> : null}
        </div>
      ))}
    </nav>
  );
}
