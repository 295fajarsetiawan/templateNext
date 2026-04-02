import Image from "next/image";

import { cn } from "@/lib/cn";

type AvatarProps = {
  src?: string;
  alt?: string;
  fallback: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: { className: "h-8 w-8 text-xs", px: 32 },
  md: { className: "h-10 w-10 text-sm", px: 40 },
  lg: { className: "h-14 w-14 text-base", px: 56 },
};

export function Avatar({ src, alt, fallback, size = "md", className }: AvatarProps) {
  const avatarSize = sizes[size];

  return src ? (
    <Image
      src={src}
      alt={alt ?? fallback}
      width={avatarSize.px}
      height={avatarSize.px}
      className={cn("rounded-full object-cover", avatarSize.className, className)}
    />
  ) : (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-zinc-950 font-semibold text-white",
        avatarSize.className,
        className
      )}
    >
      {fallback.slice(0, 2).toUpperCase()}
    </div>
  );
}
