import mongoose from 'mongoose';
import chalk from 'chalk';

export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
    console.log(chalk.green.bold('Successfully connected to MongoDB!'));
  } catch (err) {
    console.error(
      chalk.red.bold('Error connecting to MongoDB:'),
      chalk.red((err as Error).message)
    );
    process.exit(1);
  };
};