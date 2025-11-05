import type { Restaurant } from '@/types';
import type { CartItem } from '@/pages/RestaurantDetailsPage';
import { CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
};

const OrderSummary = ({ restaurant, cartItems }: Props) => {
  const getTotalCost = () => {
    const totalPriceInPence = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    const totalPriceWithDelivery = totalPriceInPence + restaurant.deliveryPrice;

    return (totalPriceWithDelivery / 100).toFixed(2);
  };

  return (
    <>
      <CardHeader>
        <CardTitle className='text-2xl font-bold tracking-tight flex justify-between'>
          <h2>Your order</h2>
          <h3>${getTotalCost()}</h3>
        </CardTitle>
      </CardHeader>

      <CardContent className='flex flex-col gap-5'>
        {cartItems?.map((cartItem) => (
          <div key={cartItem._id} className='flex justify-between'>
            <div>
              <Badge variant='outline' className='mr-2'>
                {cartItem.quantity}
              </Badge>

              <span>
                {cartItem.name}
              </span>

              <span className='flex items-center gap-1'>
                ${((cartItem.price * cartItem.quantity) / 100).toFixed(2)}
              </span>
            </div>
          </div>
        ))}

        <Separator />

        <div className='flex justify-between'>
          <span>Delivery</span>
          <span>${(restaurant.deliveryPrice / 100).toFixed(2)}</span>
        </div>
      </CardContent>
    </>
  );
};

export default OrderSummary;