import express, { type Request, type Response } from 'express';
import connectDB from '../database/connect.ts';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';
import myUserRoutes from './routes/user.route.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Food Ordering App Backend is running' });
});

await connectDB();

app.use('/api/v1/my/user', myUserRoutes);

app.listen(PORT, () => {
  console.log(chalk.green(`Server is running on port ${PORT}`));
});
