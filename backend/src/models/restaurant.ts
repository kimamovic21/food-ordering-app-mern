import { Schema, model, Types, Document } from 'mongoose';

interface MenuItemInterface {
  name: string;
  price: number;
};

export interface RestaurantInterface extends Document {
  user: Types.ObjectId;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItemInterface[];
  imageUrl: string;
  lastUpdated: Date;
};

const menuItemSchema = new Schema<MenuItemInterface>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const restaurantSchema = new Schema<RestaurantInterface>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  restaurantName: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  deliveryPrice: { type: Number, required: true },
  estimatedDeliveryTime: { type: Number, required: true },
  cuisines: { type: [String], required: true },
  menuItems: [menuItemSchema],
  imageUrl: { type: String, required: true },
  lastUpdated: { type: Date, required: true },
});

const Restaurant = model<RestaurantInterface>('Restaurant', restaurantSchema);

export default Restaurant;