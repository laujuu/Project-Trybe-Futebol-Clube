import { Model, INTEGER, STRING } from 'sequelize';
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
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default User;
