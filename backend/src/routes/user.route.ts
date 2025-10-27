import { Router } from 'express';
import {
  createCurrentUser,
  updateCurrentUser
} from '../controllers/user.controller.js';
import {
  jwtCheck,
  jwtParse
} from '../middlewares/auth.middleware.js';
import { validateMyUserRequest } from '../middlewares/validation.middleware.ts';

const router = Router();

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