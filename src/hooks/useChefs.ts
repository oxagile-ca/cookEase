import { useState, useEffect } from 'react';
import { chefApi, Chef } from '@/api/chefs';

export function useChefs() {
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchChefs();
  }, []);

  async function fetchChefs() {
    try {
      setLoading(true);
      const data = await chefApi.getAllChefs();
      setChefs(data);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching chefs:', error);
    } finally {
      setLoading(false);
    }
  }

  const searchChefs = async (query: string) => {
    try {
      setLoading(true);
      const data = await chefApi.searchChefs(query);
      setChefs(data);
    } catch (error) {
      setError(error.message);
      console.error('Error searching chefs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterByCuisine = async (cuisine: string) => {
    try {
      setLoading(true);
      const data = await chefApi.getChefsByCuisine(cuisine);
      setChefs(data);
    } catch (error) {
      setError(error.message);
      console.error('Error filtering chefs:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    chefs,
    loading,
    error,
    refetch: fetchChefs,
    searchChefs,
    filterByCuisine,
  };
}
