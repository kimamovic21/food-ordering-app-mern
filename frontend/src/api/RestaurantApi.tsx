import { useQuery } from 'react-query';
import type { SearchState } from '@/pages/search/SearchPage';
import type { Restaurant, RestaurantSearchResponse } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurant = (restaurantId?: string) => {
  const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
    const response = await fetch(
      `${API_BASE_URL}/restaurant/${restaurantId}`
    );

    if (!response.ok) {
      throw new Error('Failed to get restaurant');
    };

    return response.json();
  };

  const { data: restaurant, isLoading, error } = useQuery(
    'fetchRestaurant',
    getRestaurantByIdRequest,
    {
      enabled: !!restaurantId,
    },
  );

  return { restaurant, isLoading, error };
};

export const useSearchRestaurant = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<
    RestaurantSearchResponse
  > => {
    const params = new URLSearchParams();

    params.set('searchQuery', searchState.searchQuery);
    params.set('page', searchState.page.toString());
    params.set('selectedCuisines', searchState.selectedCuisines.join(','));
    params.set('sortOption', searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/restaurant/search/${city}?${params.toString()}`,
    );

    if (!response.ok) {
      throw new Error('Failed to search restaurants!');
    };

    return response.json();
  };

  const { data: results, isLoading, error } = useQuery(
    ['searchRestaurants', searchState],
    createSearchRequest,
    { enabled: !!city },
  );

  return { results, isLoading, error };
};