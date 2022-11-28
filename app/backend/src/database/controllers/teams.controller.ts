import { Request, Response } from 'express';

import TeamsService from '../services/teams.service';

const OK_STATUS = 200;

export default class TeamsController {
  public teamsService = new TeamsService();

  public async findAllTeams(_req: Request, res: Response) {
    const allTeams = await this.teamsService.findAllTeams();

    res.status(OK_STATUS).json(allTeams);
  }

  public async findTeamsById(req: Request, res: Response) {
    const { id } = req.params;

    const teamById = await this.teamsService.findTeamsById(id);

    res.status(OK_STATUS).json(teamById);
  }
}
