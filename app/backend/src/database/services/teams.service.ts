import { ITeams } from '../interfaces/ITeams';
import Teams from '../models/Teams';

export default class TeamsService {
  public model = Teams;

  public async findAllTeams(): Promise<ITeams[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  public async findTeamsById(id: string) {
    const teamInfo = await this.model.findByPk(id);
    return teamInfo;
  }
}
