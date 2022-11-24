import { IUsers } from '../interfaces/IUser';
import User from '../models/User';

import JwtUtils from '../utils/jwt.util';
import EncryptPassword from '../utils/bcrypts.util';

const UNAUTHORIZED = 401;

export default class UserService {
  public jwtutils = new JwtUtils();
  public bcrypts = new EncryptPassword();
  public userM = new User();

  public async login(user: IUsers) {
    const userInfo = await User.findOne({ where: { email: user.email } });

    if (!userInfo) {
      return { code: UNAUTHORIZED, message: 'Incorrect email or password' };
    }

    const compare = this.bcrypts.comparePassword(user.password, userInfo.password);

    if (!compare) {
      return { code: UNAUTHORIZED, message: 'Incorrect email or password' };
    }

    const token = this.jwtutils.createToken(userInfo.email);
    return { code: null, message: token };
  }
}
