import type { MenuItem } from '@/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '../ui/card';

type MenuItemDetailProps = {
  menuItem: MenuItem;
  addToCart: () => void;
};

const MenuItemDetail = ({ menuItem, addToCart }: MenuItemDetailProps) => {
  return (
    <Card className='cursor-pointer' onClick={addToCart}>
      <CardHeader>
        <CardTitle>
          {menuItem.name}
        </CardTitle>
      </CardHeader>

      <CardContent className='font-bold'>
        ${(menuItem.price / 100).toFixed(2)}
      </CardContent>
    </Card>
  );
};

export default MenuItemDetail;