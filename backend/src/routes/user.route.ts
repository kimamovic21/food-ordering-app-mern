import { Router } from 'express';
import {
  getCurrentUser,
  createCurrentUser,
  updateCurrentUser
} from '../controllers/user.controller';
import {
  jwtCheck,
  jwtParse
} from '../middlewares/auth.middleware';
import { validateMyUserRequest } from '../middlewares/validation.middleware';

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