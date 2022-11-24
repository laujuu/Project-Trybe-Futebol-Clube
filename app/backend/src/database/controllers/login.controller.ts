import { Request, Response } from 'express';

import UsersService from '../services/login.service';

const OK_STATUS = 200;
const UNAUTHORIZED = 401;

export default class LoginController {
  public usersService = new UsersService();

  async loginUser(req: Request, res: Response) {
    const user = req.body;

    const { code, message } = await this.usersService.login(user);

    if (code) {
      return res.status(UNAUTHORIZED).json({ message });
    }

    res.status(OK_STATUS).json({ token: message });
  }
}
