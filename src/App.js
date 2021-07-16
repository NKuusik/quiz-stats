import React from 'react';
import stats from './resources/1-2.season.csv';
import axios from 'axios';
import {parseData, getTeamResults, Team} from './scripts/readData.js'

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

export default App;