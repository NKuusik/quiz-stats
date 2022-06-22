export class Season {
    name: string;
    teams: Object;
    //Todo: ranking

    constructor (name: string, teams: Object) {
        this.name = name;
        this.teams = teams;
    }
}
