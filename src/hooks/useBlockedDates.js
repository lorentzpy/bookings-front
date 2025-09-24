import { useState, useEffect, useCallback } from 'react';
import fetchBookedDays from '../api/fetchBookedDays';
import getBlockedDates from '../utils/getBlockedDates';

export default function useBlockedDates(currentMonth) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [blockedDates, setBlockedDates] = useState(new Set());

  const refreshBlocked = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const load = async () => {
      const data = await fetchBookedDays(currentMonth);
      
      const bookedRanges = data.map(e => ({ from: e.from, to: e.to }));
      setBlockedDates(getBlockedDates(bookedRanges));
    };
    load();
  }, [currentMonth, refreshKey]);

  return { blockedDates, refreshBlocked };
}