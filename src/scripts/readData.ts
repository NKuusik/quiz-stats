import {Team} from '../classes/Team';

const papaparse = require('papaparse');

export function normalizeGameScore(rawScores: string[]): string[] {
  for (let i = 0; i < rawScores.length - 1; i++) {
    if (rawScores[i] === '') {
      rawScores[i] = '0';
    }
  }
  return rawScores;
}

export async function parseData(input: string): Promise<Object> {
  return new Promise((resolve) => {
    papaparse.parse(input, {
      complete: function(results : Object) {
        return resolve(results);
      }
    });
  });
}

export function getTeamResults(teamData: Array<string>): Team {
  let team = new Team(teamData[1], teamData.slice(2, -1), parseInt(teamData[teamData.length - 1]));
  team.latestSeasonScores = normalizeGameScore(team.latestSeasonScores);
  return team;
}
