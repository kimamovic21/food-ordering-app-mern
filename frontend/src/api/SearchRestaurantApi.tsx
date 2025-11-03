import type { RestaurantSearchResponse } from '@/types';
import { useQuery } from 'react-query';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurant = (city?: string) => {
  const createSearchRequest =
    async (): Promise<RestaurantSearchResponse> => {
      const response = await fetch(
        `${API_BASE_URL}/restaurant/search/${city}`
      );

      if (!response.ok) {
        throw new Error('Failed to search restaurants!');
      };

      return response.json();
    };

  const { data: results, isLoading, error } = useQuery(
    ['searchRestaurants'],
    createSearchRequest,
    { enabled: !!city },
  );

  return { results, isLoading, error };
};