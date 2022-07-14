import { Entity } from "../Entity";
import { Season } from "./Season";

export class Team extends Entity {
    rankings: {[seasonName: string]: number};
    name: string;
    latestSeasonScores: Array<string>;
    results: {[seasonName: string]: any[]};
    teamSeasons: {[seasonName: string]: Season}
    totalScore: number;
    color: string;

    constructor(name: string, rawLatestSeasonScores: Array<string>, totalScore: number) {
      super(name);
      this.rankings = {};
      this.results = {};
      this.teamSeasons = {};
      this.totalScore = totalScore; // Todo: totalscore iga hooaja kohta eraldi... akki season klassis?
      this.normalizeGameScore(rawLatestSeasonScores);
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
