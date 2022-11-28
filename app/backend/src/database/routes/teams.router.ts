import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';

const router = Router();

const teamsController = new TeamsController();

router.get('/', teamsController.findAllTeams.bind(teamsController));
router.get('/:id', teamsController.findTeamsById.bind(teamsController));

export default router;
