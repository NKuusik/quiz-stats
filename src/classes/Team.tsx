export class Team { 
    place: number;
    name: string;
    latestSeasonScores: Array<string>;
    seasons: Object;
    totalScore: number
  
    constructor (place: number, name: string, latestSeasonScores: Array<string>, totalScore: number) {
      this.place = place;
      this.name = name;
      this.seasons = {};
      this.latestSeasonScores = latestSeasonScores;
      this.totalScore = totalScore; // Todo: totalscore iga hooaja kohta eraldi... akki season klassis?
    }
  }