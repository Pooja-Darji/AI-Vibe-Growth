"use client";

import { useEffect, useRef, useState } from "react";
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
  const [visibleCount, setVisibleCount] = useState(8);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + 8);
        }
      },
      {
        root: containerRef.current,
        threshold: 1.0,
      }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, []);

  const visibleCampaigns = campaigns.slice(0, visibleCount);

  return (
    <Card className="overflow-hidden border border-gray-200 dark:border-gray-700">
      <div
        ref={containerRef}
        className="overflow-y-auto max-h-[400px] rounded-xl"
      >
        <table
          className="w-full border-collapse"
          role="table"
          aria-label="Campaign performance data"
        >
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <th className="px-6 py-4 text-left text-xs font-semibold">Campaign Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold">Status</th>
              <th className="px-6 py-4 text-right text-xs font-semibold">Impressions</th>
              <th className="px-6 py-4 text-right text-xs font-semibold">Clicks</th>
              <th className="px-6 py-4 text-right text-xs font-semibold">CTR</th>
              <th className="px-6 py-4 text-right text-xs font-semibold">Conversions</th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {visibleCampaigns.map((campaign) => {
              const isHighlighted = campaign.id === highlightedCampaignId;

              return (
                <tr
                  key={campaign.id}
                  className={clsx(
                    "transition-all",
                    isHighlighted
                      ? "bg-blue-50 dark:bg-blue-900/30 ring-2 ring-blue-400"
                      : "hover:bg-gray-50 dark:hover:bg-gray-700/30"
                  )}
                >
                  <td className="px-6 py-4 font-medium">
                    {campaign.name}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={campaign.status === "Active" ? "success" : "default"}>
                      {campaign.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {(campaign.impressions / 1000).toFixed(1)}K
                  </td>
                  <td className="px-6 py-4 text-right">
                    {(campaign.clicks / 1000).toFixed(1)}K
                  </td>
                  <td className="px-6 py-4 text-right">
                    {campaign.ctr.toFixed(2)}%
                  </td>
                  <td className="px-6 py-4 text-right">
                    {campaign.conversions}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {visibleCount < campaigns.length && (
          <div
            ref={loadMoreRef}
            className="py-4 text-center text-gray-500"
          >
            Loading more…
          </div>
        )}
      </div>
    </Card>
  );
}
