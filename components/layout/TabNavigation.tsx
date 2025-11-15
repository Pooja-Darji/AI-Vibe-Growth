"use client";

import { HTMLAttributes } from "react";
import clsx from "clsx";

interface TabNavigationProps extends HTMLAttributes<HTMLDivElement> {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function TabNavigation({
  tabs,
  activeTab,
  onTabChange,
  className,
  ...props
}: TabNavigationProps) {
  return (
    <div
      className={clsx("border-b border-gray-200 dark:border-gray-700", className)}
      role="tablist"
      aria-label="Main navigation tabs"
      {...props}
    >
      <nav className="flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onTabChange(tab.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onTabChange(tab.id);
                } else if (e.key === "ArrowRight") {
                  e.preventDefault();
                  const currentIndex = tabs.findIndex((t) => t.id === tab.id);
                  const nextTab = tabs[currentIndex + 1] || tabs[0];
                  onTabChange(nextTab.id);
                } else if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  const currentIndex = tabs.findIndex((t) => t.id === tab.id);
                  const prevTab = tabs[currentIndex - 1] || tabs[tabs.length - 1];
                  onTabChange(prevTab.id);
                }
              }}
              className={clsx(
                "py-4 px-1 border-b-2 font-semibold text-sm transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                isActive
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-200"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

