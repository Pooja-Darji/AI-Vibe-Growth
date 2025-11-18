"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import dynamic from "next/dynamic";
import { useCampaignStore } from "@/stores/campaignStore";
import { generatePerformanceData } from "@/data/mockCampaigns";
import { CampaignFilters } from "@/components/dashboard/CampaignFilters";
import { CampaignTable } from "@/components/dashboard/CampaignTable";
import { CampaignCard } from "@/components/dashboard/CampaignCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { Card } from "@/components/ui/Card";
import { useCampaignPolling } from "@/hooks/useCampaignPolling";

const PerformanceChart = dynamic(
  () =>
    import("@/components/dashboard/PerformanceChart").then((mod) => ({
      default: mod.PerformanceChart,
    })),
  {
    loading: () => <Skeleton className="h-64 w-full" />,
  }
);

export function MarketingDashboard() {
  const {
    filteredCampaigns,
    highlightedCampaignId,
    isLoading,
    error,
  } = useCampaignStore();
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(
    filteredCampaigns[0]?.id || null
  );
  useCampaignPolling();

  useEffect(() => {
    if (filteredCampaigns.length > 0 && !selectedCampaignId) {
      setSelectedCampaignId(filteredCampaigns[0].id);
    } else if (filteredCampaigns.length > 0 && selectedCampaignId) {
      const exists = filteredCampaigns.some((c) => c.id === selectedCampaignId);
      if (!exists) {
        setSelectedCampaignId(filteredCampaigns[0].id);
      }
    }
  }, [filteredCampaigns, selectedCampaignId]);

  const selectedCampaign = filteredCampaigns.find(
    (c) => c.id === selectedCampaignId
  );
  const chartData = useMemo(() => {
    if (!selectedCampaign) return [];
    return generatePerformanceData(selectedCampaign.id, 30);
  }, [selectedCampaign?.id]);

  if (error) {
    return (
      <Card variant="outlined">
        <div className="text-center py-8">
          <p className="text-red-600 dark:text-red-400 mb-4" role="alert">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Reload page
          </button>
        </div>
      </Card>
    );
  }

  const summaryStats = useMemo(() => {
    const totalImpressions = filteredCampaigns.reduce((sum, c) => sum + c.impressions, 0);
    const totalClicks = filteredCampaigns.reduce((sum, c) => sum + c.clicks, 0);
    const totalConversions = filteredCampaigns.reduce((sum, c) => sum + c.conversions, 0);
    const avgCTR = filteredCampaigns.length > 0
      ? filteredCampaigns.reduce((sum, c) => sum + c.ctr, 0) / filteredCampaigns.length
      : 0;
    return { totalImpressions, totalClicks, totalConversions, avgCTR };
  }, [filteredCampaigns]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Marketing Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
            Monitor and analyze your ad campaign performance
          </p>
        </div>
        <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <button
            onClick={() => setViewMode("table")}
            className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              viewMode === "table"
                ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            Table
          </button>
          <button
            onClick={() => setViewMode("cards")}
            className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              viewMode === "cards"
                ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            Cards
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">Total Impressions</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                {(summaryStats.totalImpressions / 1000).toFixed(1)}K
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center" aria-hidden="true">
              <span className="text-2xl" role="img" aria-label="Eye icon">👁️</span>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">Total Clicks</p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                {(summaryStats.totalClicks / 1000).toFixed(1)}K
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center" aria-hidden="true">
              <span className="text-2xl" role="img" aria-label="Mouse icon">🖱️</span>
            </div>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">Avg CTR</p>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                {summaryStats.avgCTR.toFixed(2)}%
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center" aria-hidden="true">
              <span className="text-2xl" role="img" aria-label="Chart icon">📊</span>
            </div>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600 dark:text-orange-400 mb-1">Conversions</p>
              <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                {summaryStats.totalConversions}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center" aria-hidden="true">
              <span className="text-2xl" role="img" aria-label="Target icon">🎯</span>
            </div>
          </div>
        </Card>
      </div>

      <CampaignFilters />

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : (
        <>
          {viewMode === "table" ? (
            <Suspense fallback={<Skeleton className="h-64 w-full" />}>
              <CampaignTable
                campaigns={filteredCampaigns}
                highlightedCampaignId={highlightedCampaignId}
              />
            </Suspense>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCampaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  isHighlighted={campaign.id === highlightedCampaignId}
                />
              ))}
            </div>
          )}

          {selectedCampaign && (
            <PerformanceChart
              data={chartData}
              campaignName={selectedCampaign.name}
            />
          )}
        </>
      )}
    </div>
  );
}
