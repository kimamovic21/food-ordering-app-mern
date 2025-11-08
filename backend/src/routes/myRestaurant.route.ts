import { Router } from 'express';
import { jwtCheck, jwtParse } from '../middlewares/auth.middleware';
import { validateMyRestaurantRequest } from '../middlewares/validation.middleware';
import {
  createMyRestaurant,
  getMyRestaurant,
  updateMyRestaurant,
  getMyRestaurantOrders
} from '../controllers/myRestaurant.controller';
import multer from 'multer';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1025, // 5mb
  },
});

router.get(
  '/',
  jwtCheck,
  jwtParse,
  getMyRestaurant
);

router.post(
  '/',
  upload.single('imageFile'),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  createMyRestaurant
);

router.put(
  '/',
  upload.single('imageFile'),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  updateMyRestaurant
);


router.get(
  '/orders',
  jwtCheck,
  jwtParse,
  getMyRestaurantOrders
);

export default router;