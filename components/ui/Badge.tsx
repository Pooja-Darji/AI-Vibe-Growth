import { HTMLAttributes } from "react";
import clsx from "clsx";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "warning" | "info" | "default";
}

export function Badge({ children, className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        {
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400":
            variant === "success",
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400":
            variant === "warning",
          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400":
            variant === "info",
          "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300":
            variant === "default",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

