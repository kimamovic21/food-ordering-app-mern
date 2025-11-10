import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'react-router-dom';
import { useGetMyUser } from '@/api/MyUserApi';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import UserProfileForm, { type UserFormData } from '@/forms/user-profile-form/UserProfileForm';
import LoadingButton from './LoadingButton';

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
  isCheckoutSessionLoading: boolean;
};

const CheckoutButton = ({
  onCheckout,
  disabled,
  isCheckoutSessionLoading,
}: Props) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { pathname } = useLocation();

  const {
    currentUser,
    isLoading: isGetUserLoading,
  } = useGetMyUser();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <Button
        onClick={onLogin}
        className='bg-orange-500 flex-1 cursor-pointer'
      >
        Login to check out
      </Button>
    );
  };

  if (isAuthLoading || !currentUser || isCheckoutSessionLoading) {
    return <LoadingButton />
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          className='bg-orange-500 flex-1 cursor-pointer'
        >
          Go to checkout
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-[425px] md:min-w-[700px] bg-gray-50'>
        <DialogTitle className='hidden'>
          Checkout form
        </DialogTitle>

        <UserProfileForm
          currentUser={currentUser}
          onSave={onCheckout}
          isLoading={isGetUserLoading}
          title='Confirm delivery details'
          buttonText='Continue to payment'
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;