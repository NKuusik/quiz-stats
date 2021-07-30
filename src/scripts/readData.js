const papaparse = require('papaparse');

class Team {
    constructor(place, name, latestSeasonScores, totalScore) {
        this.place = place;
        this.name = name;
        this.seasons = {};
        this.latestSeasonScores = latestSeasonScores;
        this.totalScore = totalScore;
        this.normalizeGameScore();
    }
    normalizeGameScore() {
        for (let i = 0; i < this.latestSeasonScores.length; i++) {
            if (this.latestSeasonScores[i] == '') {
                this.latestSeasonScores[i] = '0';
            }
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
  return team;
}

export {parseData, getTeamResults, Team};