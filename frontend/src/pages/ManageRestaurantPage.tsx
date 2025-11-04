import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant
} from '../api/MyRestaurantApi';
import ManageRestaurantForm from '@/forms/manage-restaurant-form/ManageRestaurantForm';
import type { Restaurant } from '@/types';

const ManageRestaurantPage = () => {
  const { restaurant } = useGetMyRestaurant();

  const {
    createRestaurant,
    isLoading: isCreateLoading
  } = useCreateMyRestaurant();

  const {
    updateRestaurant,
    isLoading: isUpdateLoading
  } = useUpdateMyRestaurant();

  const isEditing = !!restaurant;

  const handleCreate = async (formData: FormData): Promise<void> => {
    await new Promise<void>((resolve) => {
      createRestaurant(formData, {
        onSuccess: () => resolve(),
        onError: () => resolve(),
      });
    });
  };

  const handleUpdate = async (formData: FormData): Promise<void> => {
    await new Promise<void>((resolve) => {
      updateRestaurant(formData, {
        onSuccess: () => resolve(),
        onError: () => resolve(),
      });
    });
  };

  return (
    <div>
      <ManageRestaurantForm
        restaurant={restaurant as Restaurant | undefined}
        onSave={isEditing ? handleUpdate : handleCreate}
        isLoading={isCreateLoading || isUpdateLoading}
      />
    </div>
  );
};

export default ManageRestaurantPage;