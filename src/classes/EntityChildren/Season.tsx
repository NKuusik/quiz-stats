import {Entity} from '../Entity';

export class Season extends Entity {
    teams: object;
    totalGames: number;
    ranking: string[];

    constructor(name: string, teams: object = {}, totalGames: number = 0, ranking: string[] = []) {
      super(name);
      this.teams = teams;
      this.totalGames = totalGames;
      this.ranking = ranking;
    }
}
