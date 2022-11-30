import { ITeams } from './ITeams';

export default interface IMatch {
  id?: number;
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: number | boolean;
  teamHome?: ITeams;
  teamAway?: ITeams;
}
