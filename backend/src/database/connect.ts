import mongoose from 'mongoose';
import chalk from 'chalk';

async function connectDB(): Promise<void> {
  try {
    const connectionString = process.env.MONGODB_CONNECTION_STRING;

    if (!connectionString) {
      throw new Error('MONGODB_CONNECTION_STRING is not defined in .env file');
    };

    console.log(chalk.blue('Connecting to MongoDB...'));

    await mongoose.connect(connectionString);

    console.log(chalk.green.bold('Successfully connected to MongoDB!'));
  } catch (err) {
    console.error(
      chalk.red.bold('Error connecting to MongoDB:'),
      chalk.red((err as Error).message)
    );
    process.exit(1);
  };
};

export default connectDB;