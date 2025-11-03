import { useParams } from 'react-router-dom';
import { useSearchRestaurant } from '@/api/SearchRestaurantApi';

const SearchPage = () => {
  const { city } = useParams();
  const { results: restaurants } = useSearchRestaurant(city);

  return (
    <section>
      <span>User searched for {city}</span>
      <div>
        {restaurants?.data.map((restaurant) => (
          <div key={restaurant._id}>
            found - {restaurant.restaurantName}, {restaurant.city}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SearchPage;