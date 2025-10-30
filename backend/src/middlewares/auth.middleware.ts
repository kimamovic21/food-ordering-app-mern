import { Request, Response, NextFunction } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/user';

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
};

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE as string,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL as string,
  tokenSigningAlg: 'RS256'
});

export async function jwtParse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.sendStatus(401);
  };

  const token = authorization.split(' ')[1];

  try {
    const decodedToken = jwt.decode(token) as jwt.JwtPayload;

    const auth0Id = decodedToken.sub;

    const user = await User.findOne({ auth0Id });

    if (!user) {
      return res.sendStatus(401);
    };

    req.auth0Id = auth0Id as string;
    req.userId = user._id.toString();

    next();
  } catch (err) {
    console.error(err);
    return res.sendStatus(401);
  };
};