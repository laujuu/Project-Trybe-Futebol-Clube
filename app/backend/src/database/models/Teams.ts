import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Teams extends Model {
  // <campo>: <tipo>;
  id!: number;
  teamName!: string;
}

Teams.init({
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

export default Teams;
