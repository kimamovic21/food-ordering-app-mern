import express, { type Request, type Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';
import connectDB from './database/connect';
import myUserRoute from './routes/user.route';
import myRestaurantRoute from './routes/restaurant.route';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

app.use('/api/v1/my/user', myUserRoute);
app.use('/api/v1/my/restaurant', myRestaurantRoute);

app.listen(PORT, () => {
  console.log(chalk.green(`Server is running on port ${PORT}`));
});
