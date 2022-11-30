import { Request, Response, NextFunction } from 'express';
import Match from '../models/Match';

export default class MatchMiddleware {
  public model = Match;

  public validateTeamMatch = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = req.body;

    if (homeTeam === awayTeam) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    return next();
  };

  public validateTeamData = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = req.body;
    const homeInfo = await this.model.findByPk(homeTeam);
    const awayInfo = await this.model.findByPk(awayTeam);

    if (!homeInfo || !awayInfo) {
      return res.status(404)
        .json({ message: 'There is no team with such id!' });
    }

    return next();
  };
}
