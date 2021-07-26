import React from 'react';
import * as seasons from './resources/seasons.js';
import axios from 'axios';
import {parseData, getTeamResults, Team} from './scripts/readData.js'
import styles from './style.css';
import ViewWrapper from './components/ViewWrapper';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      teams: {},
      activeTeam: null
    };
  }

  componentDidMount() {
    for (let season of Object.values(seasons)) {    
      axios.get(season)
      .then(res => {
        return parseData(res.data);
      })
      .then(parsedData => {
        for (let i = 1; i < parsedData.data.length - 1; i++) {
          let currentTeams = {...this.state.teams};
          let teamData = getTeamResults(parsedData.data[i]);
          if (!(teamData.name in currentTeams.name)) {
            let team = new Team(teamData.place, teamData.name, 
            teamData.gameScores, teamData.totalScore);
            currentTeams[team.name] = team;
            this.setState({teams: currentTeams});
            } 
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