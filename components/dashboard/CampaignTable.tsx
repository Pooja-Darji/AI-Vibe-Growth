"use client";

import { Campaign } from "@/types";
import { Badge } from "@/components/ui/Badge";
import clsx from "clsx";
import { Card } from "../ui";

interface CampaignTableProps {
  campaigns: Campaign[];
  highlightedCampaignId?: string | null;
}

export function CampaignTable({
  campaigns,
  highlightedCampaignId,
}: CampaignTableProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  if (campaigns.length === 0) {
    return (
      <Card className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center" aria-hidden="true">
          <span className="text-3xl" role="img" aria-label="Search icon">🔍</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No campaigns found
        </h3>
        <p className="text-gray-600 dark:text-gray-300" role="status" aria-live="polite">
          No campaigns match your current filters. Try adjusting your search criteria.
        </p>
      </Card>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
      <table
        className="w-full border-collapse"
        role="table"
        aria-label="Campaign performance data"
      >
        <caption className="sr-only">Campaign performance metrics</caption>
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
            <th
              className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
              scope="col"
            >
              Campaign Name
            </th>
            <th
              className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
              scope="col"
            >
              Status
            </th>
            <th
              className="px-6 py-4 text-right text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
              scope="col"
            >
              Impressions
            </th>
            <th
              className="px-6 py-4 text-right text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
              scope="col"
            >
              Clicks
            </th>
            <th
              className="px-6 py-4 text-right text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
              scope="col"
            >
              CTR
            </th>
            <th
              className="px-6 py-4 text-right text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
              scope="col"
            >
              Conversions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {campaigns.map((campaign) => {
            const isHighlighted = campaign.id === highlightedCampaignId;
            return (
              <tr
                key={campaign.id}
                className={clsx(
                  "transition-all duration-200",
                  isHighlighted &&
                    "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/20 ring-2 ring-blue-500/50",
                  !isHighlighted &&
                    "hover:bg-gray-50 dark:hover:bg-gray-700/30"
                )}
                aria-label={`Campaign ${campaign.name}`}
              >
                <th scope="row" className="px-6 py-4 whitespace-nowrap font-medium">
                  <div className="flex items-center gap-2">
                    {isHighlighted && (
                      <div className="w-2 h-2 rounded-full bg-blue-500" aria-hidden="true"></div>
                    )}
                    <div className={clsx(
                      "text-sm font-semibold",
                      isHighlighted 
                        ? "text-blue-900 dark:text-blue-100" 
                        : "text-gray-900 dark:text-white"
                    )}>
                      {campaign.name}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge
                    variant={campaign.status === "Active" ? "success" : "default"}
                  >
                    {campaign.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    {(campaign.impressions / 1000).toFixed(1)}K
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    {(campaign.clicks / 1000).toFixed(1)}K
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {campaign.ctr.toFixed(2)}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                    {formatNumber(campaign.conversions)}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

