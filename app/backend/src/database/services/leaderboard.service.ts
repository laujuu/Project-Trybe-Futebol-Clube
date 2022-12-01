import Sequelize from '../models';
import sqlQuery from '../helpers/sql.query';

export default class LeaderboardService {
  public model = Sequelize;

  public async getLeaderboard() {
    const [boardInfo] = await this.model.query(sqlQuery);
    return boardInfo;
  }
}
