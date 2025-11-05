import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetRestaurant } from '@/api/RestaurantApi';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card } from '@/components/ui/card';
import type { MenuItem } from '@/types';
import RestaurantInfo from '@/components/restaurant-details/RestaurantInfo';
import MenuItemDetail from '@/components/restaurant-details/MenuItemDetail';
import OrderSummary from '@/components/restaurant-details/OrderSummary';

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();

  const { restaurant, isLoading, error } = useGetRestaurant(restaurantId);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (menuItem: MenuItem) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      let updatedCartItems;

      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      };

      return updatedCartItems;
    });
  };

  if (isLoading || !restaurant) {
    return (
      <span>Loading...</span>
    );
  };

  if (error) {
    return (
      <span>Something went wrong!</span>
    );
  };

  return (
    <section className='flex flex-col gap-10'>
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          alt='Restaurant image'
          className='rounded-md object-cover h-full w-full'
        />
      </AspectRatio>

      <div className='grid md:grid-cols-[4fr_2fr] gap-5 md:px-32'>
        <div className='flex flex-col gap-4'>
          <RestaurantInfo restaurant={restaurant} />

          <h2 className='text-2xl font-bold tracking-tight'>
            Menu
          </h2>

          {restaurant.menuItems.map((menuItem) => (
            <MenuItemDetail
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>

        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
            />
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DetailPage;