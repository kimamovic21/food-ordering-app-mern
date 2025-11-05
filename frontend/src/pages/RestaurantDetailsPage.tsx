import { useParams } from 'react-router-dom';
import { useGetRestaurant } from '@/api/RestaurantApi';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import RestaurantInfo from '@/components/restaurant-details/RestaurantInfo';
import MenuItemDetail from '@/components/restaurant-details/MenuItemDetail';

const DetailPage = () => {
  const { restaurantId } = useParams();

  const { restaurant, isLoading, error } = useGetRestaurant(restaurantId);

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
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DetailPage;