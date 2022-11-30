import { Router } from 'express';
import MatchsController from '../controllers/matchs.controller';
import MatchMiddleware from '../middlewares/match.middleware';

const router = Router();

const matchsController = new MatchsController();
const matchMiddleware = new MatchMiddleware();

router.get('/', matchsController.findAllMatchs.bind(matchsController));
router.post(
  '/',
  matchMiddleware.validateTeamMatch,
  matchMiddleware.validateTeamData,
  matchsController.createNewMatch.bind(matchsController),
);
router.patch('/:id/finish', matchsController.updateMatch.bind(matchsController));

export default router;
