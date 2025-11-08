import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
  useGetMyRestaurantOrders
} from '../api/MyRestaurantApi';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import type { Restaurant } from '@/types';
import ManageRestaurantForm from '@/forms/manage-restaurant-form/ManageRestaurantForm';
import OrderItemCard from '@/components/orders/OrderItemCard';

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

  const {
    orders,
    isLoading: areOrdersLoading
  } = useGetMyRestaurantOrders();

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
    <Tabs defaultValue='orders'>
      <TabsList>
        <TabsTrigger value='orders'>
          Orders
        </TabsTrigger>

        <TabsTrigger value='manage-restaurant'>
          Manage Restaurant
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value='orders'
        className='space-y-5 bg-gray-50 p-10 rounded-lg'
      >
        <h2 className='text-2xl font-bold'>
          <span className='mr-2'>
            {orders?.length}
          </span>
          <span>
            active {orders?.length === 1 ? 'order' : 'orders'}
          </span>
        </h2>

        {areOrdersLoading && (
          <span>Loading...</span>
        )}

        {orders?.map((order) => (
          <OrderItemCard
            key={order._id}
            order={order}
          />
        ))}
      </TabsContent>

      <TabsContent value='manage-restaurant'>
        <ManageRestaurantForm
          restaurant={restaurant as Restaurant | undefined}
          onSave={isEditing ? handleUpdate : handleCreate}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageRestaurantPage;