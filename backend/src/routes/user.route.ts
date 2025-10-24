import { createCurrentUser } from '../controllers/user.controller.js';
import { jwtCheck } from '../middlewares/auth.middleware.js';
import express from 'express';

const router = express.Router();

router.post('/', jwtCheck, createCurrentUser);

export default router;