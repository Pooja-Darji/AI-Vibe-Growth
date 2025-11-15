"use client";

import { Campaign } from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import clsx from "clsx";

interface CampaignCardProps {
  campaign: Campaign;
  isHighlighted?: boolean;
}

interface MetricCardProps {
  label: string;
  value: string | number;
  variant?: "default" | "primary" | "success";
}

function MetricCard({ label, value, variant = "default" }: MetricCardProps) {
  const variants = {
    default: "bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300",
    primary: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    success: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
  };

  const valueColors = {
    default: "text-gray-900 dark:text-white",
    primary: "text-blue-700 dark:text-blue-300",
    success: "text-green-700 dark:text-green-300",
  };

  return (
    <div className={clsx("p-3 rounded-lg", variants[variant])}>
      <p className={clsx("text-xs font-medium mb-1 uppercase tracking-wide", variants[variant])}>
        {label}
      </p>
      <p className={clsx("text-xl font-bold", valueColors[variant])}>
        {value}
      </p>
    </div>
  );
}

export function CampaignCard({ campaign, isHighlighted = false }: CampaignCardProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const formatToK = (num: number) => {
    return `${(num / 1000).toFixed(1)}K`;
  };

  const metrics = [
    { label: "Impressions", value: formatToK(campaign.impressions), variant: "default" as const },
    { label: "Clicks", value: formatToK(campaign.clicks), variant: "default" as const },
    { label: "CTR", value: `${campaign.ctr.toFixed(2)}%`, variant: "primary" as const },
    { label: "Conversions", value: formatNumber(campaign.conversions), variant: "success" as const },
  ];

  return (
    <Card
      variant={isHighlighted ? "highlighted" : "default"}
      className={clsx(
        "transition-all duration-300 cursor-pointer group",
        isHighlighted && "scale-[1.02] shadow-xl",
        !isHighlighted && "hover:scale-[1.01] hover:shadow-lg"
      )}
      aria-label={`Campaign ${campaign.name}`}
    >
      <div className="flex items-start justify-between mb-5">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {campaign.name}
          </h3>
          <Badge variant={campaign.status === "Active" ? "success" : "default"}>
            {campaign.status}
          </Badge>
        </div>
        {isHighlighted && (
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" aria-hidden="true" />
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>
    </Card>
  );
}