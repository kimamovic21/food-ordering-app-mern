import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetRestaurant } from '@/api/RestaurantApi';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardFooter } from '@/components/ui/card';
import type { MenuItem } from '@/types';
import type { UserFormData } from '../forms/user-profile-form/UserProfileForm';
import RestaurantInfo from '@/components/restaurant-details/RestaurantInfo';
import MenuItemDetail from '@/components/restaurant-details/MenuItemDetail';
import OrderSummary from '@/components/restaurant-details/OrderSummary';
import CheckoutButton from '@/components/checkout/CheckoutButton';

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();

  const { restaurant, isLoading, error } = useGetRestaurant(restaurantId);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);

    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

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

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id
      );

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

  const onCheckout = (userFormData: UserFormData) => {
    console.log('userFormData', userFormData);
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
              key={menuItem._id}
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
              removeFromCart={removeFromCart}
            />

            <CardFooter>
              <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckout={onCheckout}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DetailPage;