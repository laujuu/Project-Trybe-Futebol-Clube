import { ITeams } from '../interfaces/ITeams';
import Teams from '../models/Teams';

export default class TeamsService {
  public model = Teams;

  public async findaAllTeams(): Promise<ITeams[]> {
    const teams = await this.model.findAll();
    return teams;
  }
}
