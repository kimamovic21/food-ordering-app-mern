import { Router } from 'express';
import {
  getCurrentUser,
  createCurrentUser,
  updateCurrentUser
} from '../controllers/user.controller.js';
import {
  jwtCheck,
  jwtParse
} from '../middlewares/auth.middleware.js';
import { validateMyUserRequest } from '../middlewares/validation.middleware.js';

const router = Router();

router.get(
  '/',
  jwtCheck,
  jwtParse,
  getCurrentUser
);
router.post(
  '/',
  jwtCheck,
  createCurrentUser
);
router.put(
  '/',
  jwtCheck,
  jwtParse,
  validateMyUserRequest,
  updateCurrentUser
);

export default router;