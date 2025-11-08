import type { Order } from '@/types';
import { Separator } from '../ui/separator';

type Props = {
  order: Order
};

const OrderStatusDetail = ({ order }: Props) => {
  return (
    <div className='space-y-5'>
      <div className='flex flex-col'>
        <span className='font-bold'>Delivering to:</span>
        <span>{order.deliveryDetails.name}</span>
        <span>{order.deliveryDetails.addressLine1}</span>
        <span>{order.deliveryDetails.city}</span>
      </div>

      <div className='flex flex-col'>
        <span className='font-bold'>Your Orders</span>
        <ul>
          {order.cartItems.map((item) => (
            <li key={item.name} className='flex'>
              <span>{item.name}</span>
              <span className='ml-3 mr-3'>x</span>
              <span>{item.quantity}</span>
            </li>
          ))}
        </ul>
      </div>

      <Separator />

      <div className='flex flex-col'>
        <span className='font-bold'>Total</span>
        <span>${(order.totalAmount / 100).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderStatusDetail;