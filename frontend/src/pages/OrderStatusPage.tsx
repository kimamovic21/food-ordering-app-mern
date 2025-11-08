import { useGetMyOrders } from '@/api/OrderApi';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import OrderStatusHeader from '@/components/orders/OrderStatusHeader';
import OrderStatusDetail from '@/components/orders/OrderStatusDetail';

const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrders();

  if (isLoading) {
    return (
      <span>Loading...</span>
    );
  };

  if (!orders || orders.length === 0) {
    return (
      <span>No orders found...</span>
    );
  };

  return (
    <section className='space-y-10'>
      {orders.map((order) => (
        <div
          key={order._id}
          className='space-y-10 bg-gray-50 p-10 rounded-lg'
        >
          <OrderStatusHeader order={order} />

          <div className='grid gap-10 md:grid-cols-2'>
            <OrderStatusDetail order={order} />

            <AspectRatio ratio={16 / 5}>
              <img
                src={order.restaurant.imageUrl}
                alt='Restaurant image'
                className='rounded-md object-cover h-full w-full'
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </section>
  );
};

export default OrderStatusPage;