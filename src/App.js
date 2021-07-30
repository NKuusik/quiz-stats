import React from 'react';
import * as seasons from './resources/seasons.js';
import axios from 'axios';
import {parseData, getTeamResults, Team} from './scripts/readData.js'
import styles from './style.css';
import TeamViewWrapper from './components/TeamViewWrapper.js';
import SeasonViewWrapper from './components/SeasonViewWrapper.js';
import Header from './components/Header.js';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      teams: {},
      seasonsWithTeamNames: {},
      activeView: null
    };
  }

  componentDidMount() {
    let seasonsData = {};
    for (let season of Object.values(seasons)) {
      axios.get(season)
      .then(res => {
        return parseData(res.data);
      })
      .then(parsedData => {
        let currentSeason = parsedData.data[0];
        seasonsData[currentSeason] = {};
        seasonsData[currentSeason]["name"] = `season ${currentSeason}`;
        seasonsData[currentSeason]["teams"] = [];
        for (let i = 1; i < parsedData.data.length - 1; i++) {
          let currentTeams = {...this.state.teams};
          let teamData = getTeamResults(parsedData.data[i]);
          seasonsData[currentSeason]["teams"].push(teamData.name);
            if (!(teamData.name in currentTeams)) {
              let team = new Team(teamData.place, teamData.name, 
              teamData.latestSeasonScores, teamData.totalScore);
              team.seasons[`season ${currentSeason}`] = team.latestSeasonScores;
              currentTeams[team.name] = team;
            } else {
              currentTeams[teamData.name].seasons[`season ${currentSeason}`] = teamData.latestSeasonScores;
            }
            this.setState({teams: currentTeams});
            this.setState({seasonsWithTeamNames: seasonsData});
          }
        });
      }
    }

    chooseView(chosenView) {
      this.setState({activeView: chosenView});
    }
  render() {
    const activeView = this.state.activeView;
    let view;
    if (activeView == "season") {
      view = <SeasonViewWrapper seasons={this.state.seasonsWithTeamNames} teams={this.state.teams}/>;      
    } else if (activeView == "team") {
      view = <TeamViewWrapper teams={this.state.teams}/>;
    }
    return (
      <div className={styles["general-view"]}>
        <Header choice={this.chooseView.bind(this)}/>
        {view}
      </div>
        
    )
  }
}

export default App;