"use client";

import { useCampaignStore } from "@/stores/campaignStore";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "../ui";

export function CampaignFilters() {
  const { filters, setFilters, resetFilters } = useCampaignStore();

  const statusOptions = [
    { value: "All", label: "All Statuses" },
    { value: "Active", label: "Active" },
    { value: "Paused", label: "Paused" },
  ];

  return (
    <Card className="bg-gray-50/50 dark:bg-gray-800/50" role="search" aria-label="Campaign filters">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            labels="Search Campaigns"
            id="campaign-search"
            type="search"
            placeholder="Search by name..."
            value={filters.searchQuery}
            onChange={(e) => setFilters({ searchQuery: e.target.value })}
            aria-label="Search campaigns by name"
            className="bg-white dark:bg-gray-800"
          />
        </div>
        <div className="sm:w-48">
          <Select
            id="campaign-status"
            labels="Status"
            options={statusOptions}
            value={filters.status}
            onChange={(e) =>
              setFilters({ status: e.target.value as "All" | "Active" | "Paused" })
            }
            aria-label="Filter campaigns by status"
            className="bg-white dark:bg-gray-800"
          />
        </div>
        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={resetFilters}
            aria-label="Reset all filters"
            className="whitespace-nowrap"
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </Card>
  );
}

