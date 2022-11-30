import IMatchs from '../interfaces/IMatchs';
import Teams from '../models/Teams';
import Match from '../models/Match';

export default class MatchsService {
  public model = Match;

  public async findAllMatchs(): Promise<IMatchs[]> {
    const teams = await this.model.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return teams;
  }

  public async findMatchsInProgress(inProgress: boolean): Promise<IMatchs[]> {
    const teams = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return teams;
  }

  public async addNewMatch(match: IMatchs): Promise<IMatchs[]> {
    const addNew = await this.model.create({ ...match, inProgress: true });
    return addNew as unknown as IMatchs[];
  }

  public async endMatch(id: string) {
    const teamInfo = await this.model.findByPk(id);

    const updated = await teamInfo?.update({ inProgress: false });
    return updated;
  }
}
