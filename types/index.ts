export type CampaignStatus = "Active" | "Paused";

export interface Campaign {
  id: string;
  name: string;
  impressions: number;
  clicks: number;
  ctr: number; 
  conversions: number;
  status: CampaignStatus;
  startDate: string;
  endDate: string;
  budget: number;
  spend: number;
}

export interface PerformanceDataPoint {
  date: string;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
}

export interface FilterState {
  status: CampaignStatus | "All";
  dateRange: {
    start: string | null;
    end: string | null;
  };
  searchQuery: string;
}

export interface PromptIntent {
  type: "filter" | "highlight" | "sort" | "show";
  action: string;
  field?: string;
  value?: string;
  direction?: "asc" | "desc";
}

