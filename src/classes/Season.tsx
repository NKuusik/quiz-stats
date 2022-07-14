export class Season {
    name: string;
    teams: Object;
    totalGames: number;
    ranking: string[];
    color: string;

    constructor(name: string, teams: Object={}, totalGames: number=0, ranking: string[]=[]) {
      this.name = name;
      this.teams = teams;
      this.totalGames = totalGames;
      this.ranking = ranking;
      this.color = this.assignColor(this.color);
    }

    assignColor(color) {  // Tiimile ja Seasonile abstraktne klass
      if (color === undefined) {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
      } else {
        return color;
      }
    }
}
