import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import JwtUtils from '../utils/jwt.util';

const BAD_REQUEST = 400;

export default class LoginMiddleware {
  public jwtutils = new JwtUtils();

  public validateLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { password, email } = req.body;

    if (!password || !email) {
      return res.status(BAD_REQUEST)
        .json({ message: 'All fields must be filled' });
    }

    return next();
  };

  public validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(BAD_REQUEST).json({ message: 'Token not found' });
    }
    try {
      const validate = this.jwtutils.validateToken(authorization) as JwtPayload;
      req.body = validate;
    } catch (err) {
      return res.status(BAD_REQUEST).json({ message: 'Expired or invalid token' });
    }
    next();
  };
}
