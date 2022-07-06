export class Season {
    name: string;
    teams: Object;
    totalGames: number;
    ranking: string[];

    constructor(name: string, teams: Object, totalGames: number, ranking: string[]) {
      this.name = name;
      this.teams = teams;
      this.totalGames = totalGames;
      this.ranking = ranking;
    }
}
