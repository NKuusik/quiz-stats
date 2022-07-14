import {Entity} from "../Entity";

export class Season extends Entity {
    name: string;
    teams: Object;
    totalGames: number;
    ranking: string[];
    color: string;

    constructor(name: string, teams: Object={}, totalGames: number=0, ranking: string[]=[]) {
      super(name);
      this.teams = teams;
      this.totalGames = totalGames;
      this.ranking = ranking;
    }
}
