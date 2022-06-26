export class Season {
    name: string;
    teams: Object;
    total_games: number;
    ranking: string[];

    constructor (name: string, teams: Object, total_games: number, ranking: string[]) {
        this.name = name;
        this.teams = teams;
        this.total_games = total_games;
        this.ranking = ranking;
    }
}
