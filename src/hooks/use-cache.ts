
import { useState, useEffect } from 'react';

type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

type CacheOptions = {
  expiryInMinutes?: number;
  allowStaleData?: boolean;
};

const DEFAULT_EXPIRY = 5; // 5 minutes default expiry

export function useCache<T>(key: string, initialFetch: () => Promise<T>, options: CacheOptions = {}) {
  const {
    expiryInMinutes = DEFAULT_EXPIRY,
    allowStaleData = true,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Convert expiry to milliseconds
  const expiryMs = expiryInMinutes * 60 * 1000;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // Check if we have cached data
        const cachedEntry = localStorage.getItem(`cache_${key}`);
        
        if (cachedEntry) {
          const { data: cachedData, timestamp }: CacheEntry<T> = JSON.parse(cachedEntry);
          const now = new Date().getTime();
          const isExpired = now - timestamp > expiryMs;
          
          if (!isExpired) {
            // Use valid cached data
            setData(cachedData);
            setLastUpdated(new Date(timestamp));
            setLoading(false);
            return;
          } else if (allowStaleData) {
            // Use stale data temporarily while fetching fresh data
            setData(cachedData);
            setLastUpdated(new Date(timestamp));
          }
        }
        
        // Fetch fresh data
        const freshData = await initialFetch();
        
        // Update cache
        const cacheEntry: CacheEntry<T> = {
          data: freshData,
          timestamp: new Date().getTime(),
        };
        
        localStorage.setItem(`cache_${key}`, JSON.stringify(cacheEntry));
        
        // Update state
        setData(freshData);
        setLastUpdated(new Date());
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    
    // Setup periodic cache refresh if needed
    const intervalId = options.allowStaleData 
      ? setInterval(fetchData, expiryMs) 
      : undefined;
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [key, expiryMs, allowStaleData]);
  
  // Function to manually refresh the cache
  const refreshCache = async () => {
    setLoading(true);
    
    try {
      const freshData = await initialFetch();
      
      // Update cache
      const cacheEntry: CacheEntry<T> = {
        data: freshData,
        timestamp: new Date().getTime(),
      };
      
      localStorage.setItem(`cache_${key}`, JSON.stringify(cacheEntry));
      
      // Update state
      setData(freshData);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };
  
  // Function to manually clear the cache
  const clearCache = () => {
    localStorage.removeItem(`cache_${key}`);
    setData(null);
    setLastUpdated(null);
  };
  
  return { data, loading, error, lastUpdated, refreshCache, clearCache };
}
