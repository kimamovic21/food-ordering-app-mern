import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import UsernameMenu from './UsernameMenu';

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <>
      <span className='flex space-x-2 items-center'>
        {isAuthenticated ? (
          <>
            <Link
              to='/orders'
              className='font-bold hover:text-orange-500'
            >
              Orders status
            </Link>
            <UsernameMenu />
          </>
        ) : (
          <Button
            variant='ghost'
            className='font-bold hover:text-orange-500 hover:bg-white hover:cursor-pointer'
            onClick={async () => await loginWithRedirect()}
          >
            Login
          </Button>
        )}
      </span>
    </>
  );
};

export default MainNav;