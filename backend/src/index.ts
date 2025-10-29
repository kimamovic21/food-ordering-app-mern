import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';
import connectDB from './database/connect.js';
import myUserRoutes from './routes/user.route.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Food Ordering App Backend is running' });
});

app.get('/health', async (req: Request, res: Response) => {
  res.send({ message: 'Health OK!' });
});

await connectDB();

app.use('/api/v1/my/user', myUserRoutes);

app.listen(PORT, () => {
  console.log(chalk.green(`Server is running on port ${PORT}`));
});
