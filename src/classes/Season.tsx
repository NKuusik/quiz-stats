export class Season {
    name: string;
    teams: Object;
    total_games: number
    //Todo: ranking

    constructor (name: string, teams: Object, total_games: number) {
        this.name = name;
        this.teams = teams;
        this.total_games = total_games;
    }
}
