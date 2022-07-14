import { Season } from "./Season";

export class Team {
    rankings: {[seasonName: string]: number};
    name: string;
    latestSeasonScores: Array<string>;
    results: {[seasonName: string]: any[]};
    teamSeasons: {[seasonName: string]: Season}
    totalScore: number;
    color: string;

    constructor(name: string, rawLatestSeasonScores: Array<string>, totalScore: number) {
      this.rankings = {};
      this.name = name;
      this.results = {};
      this.teamSeasons = {};
      this.totalScore = totalScore; // Todo: totalscore iga hooaja kohta eraldi... akki season klassis?
      this.color = this.assignColor(this.color);
      this.normalizeGameScore(rawLatestSeasonScores);
    }

    assignColor(color) {
      if (color === undefined) {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
      } else {
        return color;
      }
    }

    normalizeGameScore(scores: string[], seasonName: string | undefined=undefined): void {
      for (let i = 0; i < scores.length - 1; i++) {
        if (scores[i] === '') {
          scores[i] = '0';
        }
      }
      if (seasonName === undefined) {
        this.latestSeasonScores = scores;
      } else {
        this.results[seasonName] = scores;
      }
    }
}
