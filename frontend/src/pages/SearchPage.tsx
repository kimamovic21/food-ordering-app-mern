import { useParams } from 'react-router-dom';
import { useSearchRestaurant } from '@/api/SearchRestaurantApi';
import SearchResultInfo from '@/components/search/SearchResultInfo';
import SearchResultCard from '@/components/search/SearchResultCard';

const SearchPage = () => {
  const { city } = useParams();
  const {
    results: restaurants,
    isLoading,
  } = useSearchRestaurant(city);

  if (!restaurants?.data || !city) {
    return <div>No restaurants found.</div>;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  };

  return (
    <section className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
      <div id='cuisines-list'>
        Insert cuisines here :)
      </div>

      <div id='main-content' className='flex flex-col gap-5'>
        <SearchResultInfo
          total={restaurants.pagination.total}
          city={city}
        />

        {restaurants.data?.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}
      </div>
    </section>
  );
};

export default SearchPage;