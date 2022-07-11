export class Team {
    rankings: any;
    name: string;
    latestSeasonScores: Array<string>;
    seasons: {[seasonName: string]: any[]};
    totalScore: number
    color: string

    constructor(name: string, latestSeasonScores: Array<string>, totalScore: number) {
      this.rankings = {};
      this.name = name;
      this.seasons = {};
      this.latestSeasonScores = latestSeasonScores;
      this.totalScore = totalScore; // Todo: totalscore iga hooaja kohta eraldi... akki season klassis?
      this.color = this.assignColor(this.color);
    }

    assignColor(color) {
      if (color === undefined) {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
      } else {
        return color;
      }
    }
}
