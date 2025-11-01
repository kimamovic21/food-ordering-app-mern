import { Router } from 'express';
import { param } from 'express-validator';
import { searchRestaurant } from '../controllers/search-restaurant.controller';

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

export default router;