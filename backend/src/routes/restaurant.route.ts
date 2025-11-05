import { Router } from 'express';
import { param } from 'express-validator';
import {
  getRestaurant,
  searchRestaurant
} from '../controllers/restaurant.controller';

const router = Router();

router.get(
  '/search/:city',
  param('city')
    .isString()
    .trim()
    .notEmpty()
    .toLowerCase()
    .withMessage('City parameter must be a valid string!'),
  searchRestaurant
);

router.get(
  '/:restaurantId',
  param('restaurantId')
    .isString()
    .trim()
    .notEmpty()
    .toLowerCase()
    .withMessage('City parameter must be a valid string!'),
  getRestaurant
);

export default router;