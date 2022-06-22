export class Team { // Eraldi moodul?
    place: number;
    name: string;
    latestSeasonScores: Array<string>;
    totalScore: number;
    seasons: Object;
  
    constructor (place: number, name: string, latestSeasonScores: Array<string>, totalScore: number) {
      this.place = place;
      this.name = name;
      this.seasons = {};
      this.latestSeasonScores = latestSeasonScores;
      this.totalScore = totalScore; // Todo: eraldi iga seasoni kohta.
    }
  }