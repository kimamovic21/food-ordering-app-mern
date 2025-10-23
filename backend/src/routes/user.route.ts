import { createCurrentUser } from '../controllers/user.controller.js';
import express from 'express';

const router = express.Router();

router.post('/', createCurrentUser);

export default router;