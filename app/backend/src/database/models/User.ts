import { Model, STRING, DataTypes } from 'sequelize';
import db from '.';

class User extends Model {
  // <campo>: <tipo>;
  id!: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string;
}

User.init({
  // ... Campos
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
  },
  role: {
    type: STRING,
  },
  email: {
    type: STRING,
  },
  password: {
    type: STRING,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'Users',
  timestamps: false,
});

export default User;
