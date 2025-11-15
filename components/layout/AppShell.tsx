"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { TabNavigation } from "@/components/layout/TabNavigation";
import { Skeleton } from "@/components/ui/Skeleton";

const MarketingDashboard = dynamic(
  () => import("@/components/dashboard/MarketingDashboard").then((mod) => ({ default: mod.MarketingDashboard })),
  {
    loading: () => (
      <div className="space-y-4">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    ),
  }
);

const PromptPlayground = dynamic(
  () => import("@/components/playground/PromptPlayground").then((mod) => ({ default: mod.PromptPlayground })),
  {
    loading: () => (
      <div className="space-y-4">
        <Skeleton className="h-64 w-full" />
      </div>
    ),
  }
);

export function AppShell() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    { id: "dashboard", label: "Marketing Dashboard" },
    { id: "playground", label: "Prompt Playground" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center" aria-hidden="true">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                AI Vibe Growth
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">Marketing Intelligence Dashboard</p>
            </div>
          </div>
          <TabNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </header>

      <main
        id="main-content"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        role="main"
      >
        <div
          role="tabpanel"
          id="panel-dashboard"
          aria-labelledby="tab-dashboard"
          hidden={activeTab !== "dashboard"}
          tabIndex={activeTab === "dashboard" ? 0 : -1}
        >
          {activeTab === "dashboard" && (
            <Suspense fallback={
              <div className="space-y-4">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
              </div>
            }>
              <MarketingDashboard />
            </Suspense>
          )}
        </div>
        <div
          role="tabpanel"
          id="panel-playground"
          aria-labelledby="tab-playground"
          hidden={activeTab !== "playground"}
          tabIndex={activeTab === "playground" ? 0 : -1}
        >
          {activeTab === "playground" && (
            <Suspense fallback={
              <div className="space-y-4">
                <Skeleton className="h-64 w-full" />
              </div>
            }>
              <PromptPlayground />
            </Suspense>
          )}
        </div>
      </main>
    </div>
  );
}

