import React from 'react';
import stats from './resources/1-2.season.csv';
import axios from 'axios';
import {parseData, getTeamResults, Team} from './scripts/readData.js'
import TeamView from './components/TeamView';
import styles from './style.css';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      teams: [],
      activeTeam: null
    };
  }

  chooseTeam(chosenTeam) {
    this.setState({
      activeTeam: chosenTeam.name
    });
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
      <div className={styles.app}>
        <h1 className={styles.app}>Hello, please choose the team you want to see.</h1>
          {this.state.teams.map(team => (
            <div>
              <button onClick={() => this.chooseTeam(team)}>{team.name}</button>
              {this.state.activeTeam == team.name && <TeamView team={team}/>}
            </div>
            ))}
      </div>
    )
  }
}

export default App;