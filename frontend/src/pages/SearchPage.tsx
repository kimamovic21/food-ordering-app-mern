import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSearchRestaurant } from '@/api/SearchRestaurantApi';
import SearchBar, { type SearchForm } from '@/components/search/SearchBar';
import SearchResultInfo from '@/components/search/SearchResultInfo';
import SearchResultCard from '@/components/search/SearchResultCard';
import PaginationSelector from '@/components/pagination/PaginationSelector';
import CuisineFilter from '@/components/cuisines/CuisineFilter';

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
};

const SearchPage = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: '',
    page: 1,
    selectedCuisines: [],
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { city } = useParams();

  const {
    results: restaurants,
    isLoading,
  } = useSearchRestaurant(searchState, city);

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: '',
      page: 1,
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
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded(
            (prevIsExpanded) => !prevIsExpanded
          )}
        />
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

        <PaginationSelector
          page={restaurants.pagination.page}
          pages={restaurants.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </section>
  );
};

export default SearchPage;