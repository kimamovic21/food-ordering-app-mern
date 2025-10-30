import { Router } from 'express';
import { createMyRestaurant } from '../controllers/restaurant.controller';
import { jwtCheck, jwtParse } from '../middlewares/auth.middleware';
import { validateMyRestaurantRequest } from '../middlewares/validation.middleware';
import multer from 'multer';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1025, // 5mb
  },
});

router.post(
  '/',
  upload.single('imageFile'),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  createMyRestaurant
);

export default router;