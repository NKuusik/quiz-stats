import { Team } from '../classes/Team';

const papaparse = require('papaparse');

function normalizeGameScore (team: Team): Team {
  for (let i = 0; i < team.latestSeasonScores.length; i++) {
    if (team.latestSeasonScores[i] === '') {
      team.latestSeasonScores[i] = '0';
    }
  }
  return team;
}

export async function parseData (input: string): Promise<Object> {
  return new Promise((resolve) => {
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