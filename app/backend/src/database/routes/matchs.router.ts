import { Router } from 'express';
import MatchsController from '../controllers/matchs.controller';

const router = Router();

const matchsController = new MatchsController();

router.get('/', matchsController.findAllMatchs.bind(matchsController));

export default router;
