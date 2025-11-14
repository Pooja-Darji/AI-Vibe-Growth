"use client";

import { useEffect, useRef } from "react";
import { useCampaignStore } from "@/stores/campaignStore";

const POLL_INTERVAL = 30_000; // 30 seconds
const MAX_RETRY_DELAY = 60_000; // 1 minute

export function useCampaignPolling() {
  const { setCampaigns, setLoading, setError } = useCampaignStore();
  const retryDelayRef = useRef(5_000);

  useEffect(() => {
    const controller = new AbortController();
    let timeoutId: NodeJS.Timeout | null = null;
    let isActive = true;

    const scheduleNextFetch = (delay: number) => {
      if (!isActive) return;
      timeoutId = setTimeout(fetchData, delay);
    };

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/campaigns", {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch campaigns");
        }

        const data = await response.json();
        setCampaigns(data);
        setError(null);
        retryDelayRef.current = 5_000;
        scheduleNextFetch(POLL_INTERVAL);
      } catch (error) {
        if (controller.signal.aborted) return;
        setError("Unable to fetch campaigns. Retrying...");
        retryDelayRef.current = Math.min(
          retryDelayRef.current * 2,
          MAX_RETRY_DELAY
        );
        scheduleNextFetch(retryDelayRef.current);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      isActive = false;
      controller.abort();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [setCampaigns, setError, setLoading]);
}

