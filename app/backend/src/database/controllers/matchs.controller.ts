import { Request, Response } from 'express';

import MatchsService from '../services/match.service';
import JwtUtils from '../utils/jwt.util';

const OK_STATUS = 200;

export default class MatchsController {
  public matchsService = new MatchsService();
  public jwtutils = new JwtUtils();

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

  public async createNewMatch(req: Request, res: Response) {
    const matchData = req.body;
    const { authorization } = req.headers;
    try {
      this.jwtutils.validateToken(authorization as string);
      const newMatch = await this.matchsService.addNewMatch(matchData);
      res.status(201).json(newMatch);
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;

    await this.matchsService.endMatch(id);
    res.status(200).json({ message: 'Finished' });
  }
}
