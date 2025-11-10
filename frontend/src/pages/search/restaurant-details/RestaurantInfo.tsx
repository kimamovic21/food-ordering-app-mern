import { Dot } from 'lucide-react';
import type { Restaurant } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

type Props = {
  restaurant: Restaurant;
};

const RestaurantInfo = ({ restaurant }: Props) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className='text-3xl font-bold tracking-tight'>
            {restaurant.restaurantName}
          </CardTitle>
          <CardDescription>
            {restaurant.city}, {restaurant.country}
          </CardDescription>
        </CardHeader>

        <CardContent className='flex'>
          {restaurant.cuisines.map((cuisine, index) => (
            <div key={cuisine} className='flex'>
              <span>
                {cuisine}
              </span>
              <span>
                {index < restaurant.cuisines.length - 1 && <Dot />}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantInfo;