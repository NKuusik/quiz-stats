import { Season } from "./Season";

export class Team {
    rankings: {[seasonName: string]: number};
    name: string;
    latestSeasonScores: Array<string>;
    results: {[seasonName: string]: any[]};
    teamSeasons: {[seasonName: string]: Season}
    totalScore: number;
    color: string;

    constructor(name: string, latestSeasonScores: Array<string>, totalScore: number) {
      this.rankings = {};
      this.name = name;
      this.results = {};
      this.teamSeasons = {};
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
