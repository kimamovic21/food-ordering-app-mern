import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layouts/layout';
import HomePage from './pages/home/HomePage';
import AuthCallbackPage from './pages/auth/AuthCallbackPage';
import ProtectedRoute from './auth/ProtectedRoute';
import SearchPage from './pages/search/SearchPage';
import OrderStatusPage from './pages/orders/OrderStatusPage';
import ManageRestaurantPage from './pages/manage-restaurant/ManageRestaurantPage';
import RestaurantDetailsPage from './pages/search/restaurant-details/RestaurantDetailsPage';
import UserProfilePage from './pages/user-profile/UserProfilePage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Layout showHero={true}>
            <HomePage />
          </Layout>
        }
      />

      <Route
        path='/auth-callback'
        element={<AuthCallbackPage />}
      />

      <Route
        path='/search/:city'
        element={
          <Layout showHero={false}>
            <SearchPage />
          </Layout>
        }
      />

      <Route
        path='/detail/:restaurantId'
        element={
          <Layout showHero={false}>
            <RestaurantDetailsPage />
          </Layout>
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route
          path='/user-profile'
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
        <Route
          path='/manage-restaurant'
          element={
            <Layout>
              <ManageRestaurantPage />
            </Layout>
          }
        />
        <Route
          path='/orders'
          element={
            <Layout>
              <OrderStatusPage />
            </Layout>
          }
        />
      </Route>

      <Route path='*' element={<Navigate to={'/'} />} />
    </Routes>
  );
};

export default AppRoutes;