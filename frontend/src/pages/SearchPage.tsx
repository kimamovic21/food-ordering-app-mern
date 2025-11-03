import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSearchRestaurant } from '@/api/SearchRestaurantApi';
import SearchBar, { type SearchForm } from '@/components/search/SearchBar';
import SearchResultInfo from '@/components/search/SearchResultInfo';
import SearchResultCard from '@/components/search/SearchResultCard';

export type SearchState = {
  searchQuery: string;
};

const SearchPage = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: '',
  });

  const { city } = useParams();

  const {
    results: restaurants,
    isLoading,
  } = useSearchRestaurant(searchState, city);

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: '',
    }));
  };

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
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder='Search by cuisine or restaurant name'
          onReset={resetSearch}
        />

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