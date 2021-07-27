import React from 'react';
import * as seasons from './resources/seasons.js';
import axios from 'axios';
import {parseData, getTeamResults, Team} from './scripts/readData.js'
import styles from './style.css';
import ViewWrapper from './components/ViewWrapper.js';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      teams: {},
      activeTeam: null
    };
  }

  componentDidMount() {
    let seasonNo = 0;
    for (let season of Object.values(seasons)) {
      axios.get(season)
      .then(res => {
        return parseData(res.data);
      })
      .then(parsedData => {
        let currentSeason = parsedData.data[0];
        for (let i = 1; i < parsedData.data.length - 1; i++) {
          let currentTeams = {...this.state.teams};
          let teamData = getTeamResults(parsedData.data[i]);
            if (!(teamData.name in currentTeams)) {

              let team = new Team(teamData.place, teamData.name, 
              teamData.gameScores, teamData.totalScore);
              team.seasons[currentSeason] = team.gameScores;
              currentTeams[team.name] = team;
            } else {
              currentTeams[teamData.name].seasons[currentSeason] = teamData.gameScores;
            }
            this.setState({teams: currentTeams});
          }
        });
      }
    }
  render() {
    return (
      <div className={styles["general-view"]}>
          <ViewWrapper teams={this.state.teams}/>
      </div>
        
    )
  }
}

export default App;