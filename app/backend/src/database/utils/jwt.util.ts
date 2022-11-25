import { sign, verify } from 'jsonwebtoken';
import 'dotenv/config';
import UserModel from '../models/User';

export default class JwtUtils {
  public user = new UserModel();

  public sign = sign;
  public verify = verify;

  public createToken(email: string) {
    const token = this.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });
    return token;
  }

  public validateToken(token: string) {
    return this.verify(token, process.env.JWT_SECRET as string);
  }
}
