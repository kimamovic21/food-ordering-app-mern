import { type Request, type Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';
import Restaurant from '../models/restaurant';

export async function getMyRestaurant(req: Request, res: Response) {
  try {
    const restaurant = await Restaurant.findOne({
      user: req.userId
    });

    if (!restaurant) {
      return res
        .status(404)
        .json({ message: 'Restaurant not found!' });
    };

    return res.status(200).json(restaurant);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: 'Something went wrong!' });
  };
};

export async function createMyRestaurant(req: Request, res: Response) {
  try {
    const existingRestaurant = await Restaurant.findOne({
      user: req.userId
    });

    if (existingRestaurant) {
      return res
        .status(409)
        .json({ message: 'User restaurant already exists!' });
    };

    const image = req.file as Express.Multer.File;

    const base64Image = Buffer.from(image.buffer).toString('base64');

    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    const uploadResponse = await cloudinary.uploader.upload(dataURI);

    const restaurant = new Restaurant(req.body);

    restaurant.imageUrl = uploadResponse.url;

    restaurant.user = new mongoose.Types.ObjectId(req.userId);

    restaurant.lastUpdated = new Date();

    await restaurant.save();

    return res
      .status(201)
      .send(restaurant);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: 'Something went wrong!' });
  };
};

export async function updateMyRestaurant(req: Request, res: Response) {
  try {
    const restaurant = await Restaurant.findOne({
      user: req.userId
    });

    if (!restaurant) {
      return res
        .status(404)
        .json({ message: 'Restaurant not found!' });
    };

    restaurant.restaurantName = req.body.restaurantName;
    restaurant.city = req.body.city;
    restaurant.country = req.body.country;
    restaurant.deliveryPrice = req.body.deliveryPrice;
    restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    restaurant.cuisines = req.body.cuisines;
    restaurant.menuItems = req.body.menuItems;
    restaurant.lastUpdated = new Date();

    if (req.file) {
      const image = req.file as Express.Multer.File;
      const base64Image = Buffer.from(image.buffer).toString('base64');
      const dataURI = `data:${image.mimetype};base64,${base64Image}`;
      const uploadResponse = await cloudinary.uploader.upload(dataURI);

      restaurant.imageUrl = uploadResponse.url;
    };

    await restaurant.save();

    return res.status(200).send(restaurant);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: 'Something went wrong!' });
  };
};