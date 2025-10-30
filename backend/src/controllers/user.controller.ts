import { type Request, type Response } from 'express';
import User from '../models/user';

export async function getCurrentUser(req: Request, res: Response) {
  try {
    const currentUser = await User.findOne({ _id: req.userId });

    if (!currentUser) {
      return res.status(404).json({ message: 'User not found!' });
    };

    res.json(currentUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Something went wrong!' });
  };
};

export async function createCurrentUser(req: Request, res: Response) {
  try {
    const { auth0Id } = req.body;

    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      return res.status(200).send();
    };

    const newUser = new User(req.body);

    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user!' });
  };
};

export async function updateCurrentUser(req: Request, res: Response) {
  try {
    const { name, addressLine1, country, city } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    };

    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save();

    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating user!' });
  };
};