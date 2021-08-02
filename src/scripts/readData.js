const papaparse = require('papaparse');

class Team {
    constructor(place, name, latestSeasonScores, totalScore) {
        this.place = place;
        this.name = name;
        this.seasons = {};
        this.latestSeasonScores = latestSeasonScores;
        this.totalScore = totalScore; // Todo: eraldi iga seasoni kohta.
    }
}
    function normalizeGameScore(team) { //Todo: Refactor into pure function.
        for (let i = 0; i < team.latestSeasonScores.length; i++) {
            if (team.latestSeasonScores[i] == '') {
                team.latestSeasonScores[i] = '0';
            }
        } 
    }


async function parseData(input) {
  return new Promise((resolve, reject) => {
      papaparse.parse(input, {
          complete: function(results) {
              return resolve(results);
          }
      })
  })
}


function getTeamResults(teamData) {
  let team = {
      place: teamData[0],
      name: teamData[1],
      latestSeasonScores: teamData.slice(2, -1),
      totalScore: teamData[teamData.length - 1],
  };
  normalizeGameScore(team);
  return team;
}

export {parseData, getTeamResults, Team};