import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  // <campo>: <tipo>;
  id!: number;
  teamName!: string;
}

User.init({
  // ... Campos
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default User;
