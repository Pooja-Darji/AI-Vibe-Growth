import { create } from "zustand";
import { Campaign, FilterState, PromptIntent } from "@/types";
import { mockCampaigns } from "@/data/mockCampaigns";

interface CampaignStore {
  campaigns: Campaign[];
  filteredCampaigns: Campaign[];
  filters: FilterState;
  highlightedCampaignId: string | null;
  sortField: keyof Campaign | null;
  sortDirection: "asc" | "desc" | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCampaigns: (campaigns: Campaign[]) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  applyPromptIntent: (intent: PromptIntent) => void;
  clearHighlight: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Computed
  applyFiltersAndSort: () => void;
}

const initialFilters: FilterState = {
  status: "All",
  dateRange: {
    start: null,
    end: null,
  },
  searchQuery: "",
};

export const useCampaignStore = create<CampaignStore>((set, get) => ({
  campaigns: mockCampaigns,
  filteredCampaigns: mockCampaigns,
  filters: initialFilters,
  highlightedCampaignId: null,
  sortField: null,
  sortDirection: null,
  isLoading: false,
  error: null,

  setCampaigns: (campaigns) => {
    set({ campaigns });
    get().applyFiltersAndSort();
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
    get().applyFiltersAndSort();
  },

  resetFilters: () => {
    set({
      filters: initialFilters,
      highlightedCampaignId: null,
      sortField: null,
      sortDirection: null,
    });
    get().applyFiltersAndSort();
  },

  applyPromptIntent: (intent) => {
    const state = get();
    
    // Reset previous highlights
    set({ highlightedCampaignId: null });
    
    switch (intent.type) {
      case "filter":
        if (intent.field === "status" && intent.value) {
          state.setFilters({ status: intent.value as "Active" | "Paused" });
        } else if (intent.field === "name" && intent.value) {
          state.setFilters({ searchQuery: intent.value });
        }
        break;
        
      case "sort":
        set({
          sortField: intent.field as keyof Campaign,
          sortDirection: intent.direction || "desc",
        });
        state.applyFiltersAndSort();
        break;
        
      case "highlight":
        // First sort, then highlight the top one
        set({
          sortField: intent.field as keyof Campaign,
          sortDirection: intent.direction || "desc",
        });
        state.applyFiltersAndSort();
        // Highlight will be set after sorting
        break;
        
      case "show":
        state.resetFilters();
        break;
    }
  },

  clearHighlight: () => {
    set({ highlightedCampaignId: null });
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  setError: (error) => {
    set({ error });
  },

  applyFiltersAndSort: () => {
    const { campaigns, filters, sortField, sortDirection } = get();
    
    let filtered = [...campaigns];
    
    // Apply status filter
    if (filters.status !== "All") {
      filtered = filtered.filter((campaign) => campaign.status === filters.status);
    }
    
    // Apply search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter((campaign) =>
        campaign.name.toLowerCase().includes(query)
      );
    }
    
    // Apply date range filter
    if (filters.dateRange.start) {
      filtered = filtered.filter(
        (campaign) => campaign.startDate >= filters.dateRange.start!
      );
    }
    if (filters.dateRange.end) {
      filtered = filtered.filter(
        (campaign) => campaign.endDate <= filters.dateRange.end!
      );
    }
    
    // Apply sorting
    if (sortField && sortDirection) {
      filtered.sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        
        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
        }
        
        if (typeof aVal === "string" && typeof bVal === "string") {
          return sortDirection === "asc"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }
        
        return 0;
      });
    }
    
    // Set highlighted campaign if sorting by performance
    let highlightedId: string | null = null;
    if (sortField && filtered.length > 0) {
      highlightedId = filtered[0].id;
    }
    
    set({
      filteredCampaigns: filtered,
      highlightedCampaignId: highlightedId,
    });
  },
}));

