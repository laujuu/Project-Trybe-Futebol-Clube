import { Request, Response } from 'express';

import MatchsService from '../services/match.service';

const OK_STATUS = 200;

export default class MatchsController {
  public matchsService = new MatchsService();

  public async findAllMatchs(req: Request, res: Response) {
    const { inProgress } = req.query;
    const type = inProgress === 'true';

    if (inProgress === undefined) {
      const allMatchs = await this.matchsService.findAllMatchs();
      return res.status(OK_STATUS).json(allMatchs);
    }
    const matchType = await this.matchsService.findMatchsInProgress(type);
    return res.status(OK_STATUS).json(matchType);
  }
}
