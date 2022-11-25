import { ModelStatic } from 'sequelize';

import { IUsers } from '../interfaces/IUser';
import User from '../models/User';

import JwtUtils from '../utils/jwt.util';
import EncryptPassword from '../utils/bcrypts.util';

const UNAUTHORIZED = 401;

export default class UserService {
  public jwtutils = new JwtUtils();
  public bcrypts = new EncryptPassword();

  constructor(private model: ModelStatic<User> = User) {
  }

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
    return { code: null, token };
  }

  public async verify(user: IUsers) {
    const userInfo = await this.model.findOne({ where: { email: user.email } });

    if (!userInfo) {
      return { code: UNAUTHORIZED, message: ' email or password invalid' };
    }

    return { code: null, message: userInfo.role };
  }
}
