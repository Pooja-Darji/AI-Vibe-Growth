import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "highlighted" | "outlined";
}

export function Card({ children, className, variant = "default", ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-xl p-6",
        "bg-white dark:bg-gray-800",
        "shadow-sm border transition-all duration-200",
        "hover:shadow-md",
        {
          "border-gray-200 dark:border-gray-700": variant === "default",
          "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/20 dark:border-blue-400 ring-2 ring-blue-500/30 shadow-lg":
            variant === "highlighted",
          "border-2 border-gray-300 dark:border-gray-600": variant === "outlined",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

