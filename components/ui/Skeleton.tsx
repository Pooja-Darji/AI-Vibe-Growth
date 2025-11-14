import { HTMLAttributes } from "react";
import clsx from "clsx";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
}

export function Skeleton({ className, variant = "rectangular", ...props }: SkeletonProps) {
  return (
    <div
      className={clsx(
        "animate-pulse bg-gray-200 dark:bg-gray-700",
        {
          "rounded": variant === "rectangular",
          "rounded-full": variant === "circular",
          "h-4": variant === "text",
        },
        className
      )}
      {...props}
    />
  );
}

