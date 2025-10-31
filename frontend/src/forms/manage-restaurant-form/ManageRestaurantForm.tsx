import { useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import type { Restaurant } from '@/types';
import DetailsSection from './DetailsSection';
import CuisinesSection from './CuisinesSection';
import MenuSection from './MenuSection';
import ImageSection from './ImageSection';
import LoadingButton from './LoadingButton';

const formSchema = z.object({
  restaurantName: z.string({
    required_error: 'Restaurant name is required!',
  }),
  city: z.string({
    required_error: 'Restaurant name is required!',
  }),
  country: z.string({
    required_error: 'Country is required!',
  }),
  deliveryPrice: z.coerce.number({
    required_error: 'Delivery price is required!',
    invalid_type_error: 'Must be a valid number!',
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: 'Estimated delivery time is required!',
    invalid_type_error: 'Must be a valid number!',
  }),
  cuisines: z.array(z.string()).nonempty({
    message: 'Please select at least one item!',
  }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, 'Name is required!'),
      price: z.coerce.number().min(1, 'Price is required!'),
    })),
  imageFile: z.instanceof(File, { message: 'Image is required!' }),
});

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  restaurant?: Restaurant;
  createRestaurant: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({
  restaurant,
  createRestaurant: onSave,
  isLoading
}: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: '', price: 0 }],
    },
  });

  useEffect(() => {
    if (!restaurant) {
      return;
    };

    const deliveryPriceFormatted = parseInt(
      (restaurant!.deliveryPrice / 100).toFixed(2)
    );

    const menuItemsFormatted = restaurant!.menuItems?.map((menuItem) => ({
      ...menuItem,
      price: parseInt((menuItem.price / 100).toFixed(2)),
    }));

    const updatedRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    };

    form.reset(updatedRestaurant);
  }, [form, restaurant]);

  const onSubmit = (formDataJson: RestaurantFormData) => {
    const formData = new FormData();

    formData.append(
      'restaurantName',
      formDataJson.restaurantName
    );
    formData.append(
      'city',
      formDataJson.city
    );
    formData.append(
      'country',
      formDataJson.country
    );
    formData.append(
      'deliveryPrice',
      (formDataJson.deliveryPrice * 100).toString()
    );
    formData.append(
      'estimatedDeliveryTime',
      formDataJson.estimatedDeliveryTime.toString()
    );
    formDataJson.cuisines.forEach((cuisine, index) =>
      formData.append(`cuisines[${index}]`, cuisine)
    );
    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(
        `menuItems[${index}][name]`, menuItem.name
      );
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString()
      );
    });
    formData.append(
      'imageFile',
      formDataJson.imageFile
    );

    onSave(formData);

    console.log('formDataJson', formDataJson);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 bg-gray-50 p-10 rounded-lg'
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <ImageSection />
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type='submit'>
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;