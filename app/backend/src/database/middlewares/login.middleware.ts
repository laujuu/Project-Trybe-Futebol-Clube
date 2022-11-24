import { Request, Response, NextFunction } from 'express';

const BAD_REQUEST = 400;

export default class LoginMiddleware {
  public validateLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { password, email } = req.body;

    if (!password || !email) {
      return res.status(BAD_REQUEST)
        .json({ message: 'All fields must be filled' });
    }

    return next();
  };
}
