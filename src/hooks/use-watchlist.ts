"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { domainKeys } from "@/lib/query/keys";
import type { WatchlistItem } from "@/lib/types/domain";

const WATCHLIST_STORAGE_KEY = "domains_prohor_watchlist";

function getLocalWatchlist(): WatchlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(WATCHLIST_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setLocalWatchlist(items: WatchlistItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(items));
  } catch {
  }
}

export function useWatchlist() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: domainKeys.watchlist(),
    queryFn: getLocalWatchlist,
    staleTime: Number.POSITIVE_INFINITY,
  });

  const toggleMutation = useMutation({
    mutationFn: async (item: Omit<WatchlistItem, "addedAt">) => {
      const current = getLocalWatchlist();
      const exists = current.some((w) => w.domain === item.domain);
      let updated: WatchlistItem[];
      if (exists) {
        updated = current.filter((w) => w.domain !== item.domain);
      } else {
        updated = [...current, { ...item, addedAt: new Date().toISOString() }];
      }
      setLocalWatchlist(updated);
      return updated;
    },
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: domainKeys.watchlist() });
      const previous = queryClient.getQueryData<WatchlistItem[]>(domainKeys.watchlist()) || [];
      const exists = previous.some((w) => w.domain === newItem.domain);
      const optimistic = exists
        ? previous.filter((w) => w.domain !== newItem.domain)
        : [...previous, { ...newItem, addedAt: new Date().toISOString() }];
      queryClient.setQueryData(domainKeys.watchlist(), optimistic);
      return { previous };
    },
    onError: (_err, _newItem, context) => {
      if (context?.previous) {
        queryClient.setQueryData(domainKeys.watchlist(), context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: domainKeys.watchlist() });
    },
  });

  const isSaved = (domain: string) => {
    return (query.data || []).some((item) => item.domain.toLowerCase() === domain.toLowerCase());
  };

  return {
    watchlist: query.data || [],
    isLoading: query.isLoading,
    toggleSave: toggleMutation.mutate,
    isSaved,
  };
}
