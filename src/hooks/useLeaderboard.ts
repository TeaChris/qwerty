import { useEffect, useCallback, useRef, useState } from 'react';

import { saleService } from './../services/sale.service';
import type { LeaderboardEntry } from '../types';
import { useSaleStore } from '../stores';

interface UseLeaderboardResult {
      leaderboard: LeaderboardEntry[];
      isLoading: boolean;
      loadMore: () => Promise<void>;
      hasMore: boolean;
      total: number;
}

const POLL_INTERVAL = 5000; // Poll every 5 seconds

export function useLeaderboard(): UseLeaderboardResult {
      const { leaderboard, setLeaderboard, status } = useSaleStore();
      const [isLoading, setIsLoading] = useState(false);
      const [page, setPage] = useState(1);
      const [total, setTotal] = useState(0);
      const [hasMore, setHasMore] = useState(true);

      const pollIntervalRef = useRef<number | null>(null);
      const isSaleLive = status?.status === 'live';

      // Fetch leaderboard
      const fetchLeaderboard = useCallback(
            async (pageNum = 1, append = false) => {
                  setIsLoading(true);

                  try {
                        if (!status?._id) return;
                        const { data, error } = await saleService.getLeaderboard(status._id, pageNum, 10);

                        if (data) {
                              if (append) {
                                    setLeaderboard((prev: LeaderboardEntry[]) => [...prev, ...data.entries]);
                              } else {
                                    setLeaderboard(data.entries);
                              }
                              setTotal(data.total);
                              setHasMore(
                                    data.entries.length === 10 &&
                                          (append ? leaderboard.length : 0) + data.entries.length < data.total
                              );
                        } else if (error) {
                              console.error('Failed to fetch leaderboard:', error);
                        }
                  } finally {
                        setIsLoading(false);
                  }
            },
            [leaderboard.length, setLeaderboard, status?._id]
      );

      // Initial fetch
      useEffect(() => {
            fetchLeaderboard(1, false);
      }, [fetchLeaderboard]);

      // Polling when sale is live
      useEffect(() => {
            if (isSaleLive) {
                  pollIntervalRef.current = window.setInterval(() => {
                        fetchLeaderboard(1, false);
                  }, POLL_INTERVAL);
            }

            return () => {
                  if (pollIntervalRef.current) {
                        clearInterval(pollIntervalRef.current);
                  }
            };
      }, [isSaleLive, fetchLeaderboard]);

      // Load more for pagination
      const loadMore = useCallback(async () => {
            if (!hasMore || isLoading) return;
            const nextPage = page + 1;
            setPage(nextPage);
            await fetchLeaderboard(nextPage, true);
      }, [hasMore, isLoading, page, fetchLeaderboard]);

      return {
            leaderboard,
            isLoading,
            loadMore,
            hasMore,
            total
      };
}
