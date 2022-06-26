export class Team { 
    place: number;
    name: string;
    latestSeasonScores: Array<string>;
    seasons: Object;
  
    constructor (place: number, name: string, latestSeasonScores: Array<string>, totalScore: number) {
      this.place = place;
      this.name = name;
      this.seasons = {};
      this.latestSeasonScores = latestSeasonScores;
    }
  }