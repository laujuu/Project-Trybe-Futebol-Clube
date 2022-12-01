import { Request, Response } from 'express';

import LeaderboardService from '../services/leaderboard.service';

export default class MatchsController {
  public leaderboardService = new LeaderboardService();

  public async getLeaderBoard(req: Request, res: Response) {
    const leaderboard = await this.leaderboardService.getLeaderboard();
    res.status(200).json(leaderboard);
  }
}
