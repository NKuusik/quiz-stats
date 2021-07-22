import React from 'react';
import stats from './resources/1-2.season.csv';
import axios from 'axios';
import {parseData, getTeamResults, Team} from './scripts/readData.js'
import styles from './style.css';
import ViewWrapper from './components/ViewWrapper';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      teams: [],
      activeTeam: null
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
        let team = new Team(teamData.place, teamData.name, 
          teamData.gameScores, teamData.totalScore);
        parsedTeams.push(team);     
      }

      this.setState({teams: parsedTeams});
      }
    );
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