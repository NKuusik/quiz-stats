const papaparse = require('papaparse');

export class Team {
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
function normalizeGameScore (team: Team): Team {
  for (let i = 0; i < team.latestSeasonScores.length; i++) {
    if (team.latestSeasonScores[i] === '') {
      team.latestSeasonScores[i] = '0';
    }
  }
  return team;
}

export async function parseData (input: string): Promise<Object> {
  return new Promise((resolve, reject) => {
    papaparse.parse(input, {
      complete: function (results : Object) {
        return resolve(results);
      }
    });
  });
}

export function getTeamResults (teamData: Array<string>): Team {
  let team = new Team(parseInt(teamData[0]), teamData[1], teamData.slice(2, -1), parseInt(teamData[teamData.length - 1]));
  team = normalizeGameScore(team);
  return team;
}
