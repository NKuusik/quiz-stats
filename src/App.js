import React from 'react';
import stats from './resources/1-2.season.csv';
import axios from 'axios';

const papaparse = require('papaparse');

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      teams: []
    };
  }

  componentDidMount() {
    axios.get(stats)
    .then(res => {
      return parseData(res.data);
    })
    .then(parsedData => {
      let parsedTeams = new Array();
      for (let i = 1; i < parsedData.data.length - 1; i++) {
        let teamData = getTeamResults(parsedData.data[i]);
        let team = new Team(teamData.place, teamData.name, teamData.gameScores, teamData.totalScore);
        parsedTeams.push(team);     
      }

      this.setState({teams: parsedTeams});
      }
    );
  }
  render() {
    return (
      <div>
        <h1>Hello</h1>
          {this.state.teams.map(team => (
            <div>
                <h2>The team in place {team.place} is {team.name}</h2>
                <h2>Their points during the season were: {team.gameScoresAsSting}</h2>
                <h2>Their total score was {team.totalScore}</h2>      
                <h2>---------------------------------------------------------</h2>      
            </div>
            ))}
      </div>
    )
  }
}


class Team {
    constructor(place, name, gameScores, totalScore) {
        this.place = place;
        this.name = name;
        this.gameScores = gameScores;
        this.totalScore = totalScore;
        this.normalizeGameScore();
        this.gameScoresAsSting = this.displayGameScore();
    }
    normalizeGameScore() {
        for (let i = 0; i < this.gameScores.length; i++) {
            if (this.gameScores[i] == '') {
                this.gameScores[i] = '0';
            }
        } 
    }
    displayGameScore() {
        let output = "";
        for (let i = 0; i < this.gameScores.length - 1; i++) {
          output += this.gameScores[i]
          if (i == this.gameScores.length - 2) {
            output += ".";
          } else {
            output += ", ";
          }
        }
        return output;
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
      gameScores: teamData.slice(2, -1),
      totalScore: teamData[teamData.length - 1],
  };
  return team;
}

export default App;