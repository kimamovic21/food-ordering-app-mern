import express, { type Request, type Response } from 'express';
import { connectDB } from '../database/connect.js';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Food Ordering App Backend is running' });
});

await connectDB();

app.listen(PORT, () => {
  console.log(chalk.green(`Server is running on port ${PORT}`));
});
