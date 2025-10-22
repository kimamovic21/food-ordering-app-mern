import { useAuth0 } from '@auth0/auth0-react';
import { CircleUserRound, Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from '../ui/sheet';
import MobileNavLinks from './MobileNavLinks';

const MobileNav = () => {
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className='text-orange-500' />
      </SheetTrigger>

      <SheetContent className='p-3'>
        <SheetTitle>
          {isAuthenticated ? (
            <span className='flex items-center font-bold gap-2'>
              <CircleUserRound className='text-orange-500' />
              {user?.email}
            </span>
          ) : (
            <span>Welcome to MernEats.com</span>
          )}
        </SheetTitle>

        <Separator />

        <SheetDescription className='flex flex-col gap-4'>
          {isAuthenticated ? (
            <MobileNavLinks />
          ) : (
            <Button
              className='flex-1 font-bold bg-orange-500'
              onClick={() => loginWithRedirect()}
            >
              Login
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;