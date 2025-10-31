import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';
import type { Restaurant } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/my/restaurant`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch restaurant!');
    };

    return response.json();
  };

  const {
    data: restaurant,
    isLoading,
    error
  } = useQuery('fetchMyRestaurant', getMyRestaurantRequest);

  if (error) {
    toast.error('Failed to fetch restaurant!');
  };

  return {
    restaurant,
    isLoading,
    error
  };
};

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/my/restaurant`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error('Failed to create restaurant!');
    };

    return response.json();
  };

  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error
  } = useMutation(createMyRestaurantRequest);

  if (isSuccess) {
    toast.success('Restaurant created successfully!');
  };

  if (error) {
    toast.error('Failed to create restaurant!');
  };

  return {
    createRestaurant,
    isLoading,
    isSuccess,
    error
  };
};

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/my/restaurant`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error('Failed to update restaurant!');
    };

    return response.json();
  };

  const {
    mutate: updateRestaurant,
    isLoading,
    isSuccess,
    error
  } = useMutation(updateMyRestaurantRequest);

  if (isSuccess) {
    toast.success('Restaurant updated successfully!');
  };

  if (error) {
    toast.error('Failed to update restaurant!');
  };

  return {
    updateRestaurant,
    isLoading,
    isSuccess,
    error
  };
};