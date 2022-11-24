import * as bcrypt from 'bcryptjs';
import UserModel from '../models/User';

export default class encryptPassword {
  public user = new UserModel();
  public bcrypt = bcrypt;

  public async hashPassword(password: string) {
    const salt = await this.bcrypt.genSalt(10);
    return this.bcrypt.hashSync(password, salt);
  }

  public comparePassword(password: string, hash: string): boolean {
    return this.bcrypt.compareSync(password, hash);
  }
}
