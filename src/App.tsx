import React from 'react';
import * as seasons from './resources/seasons';
import axios from 'axios';
import { parseData, getTeamResults, Team } from './scripts/readData';
import styles from './style.css';
import TeamViewWrapper from './components/TeamViewWrapper';
import SeasonViewWrapper from './components/SeasonViewWrapper';
import Header from './components/Header';

type MyState = {
  teams: Object;
  seasonsWithTeamNames: Object;
  activeView: string;
}

class App extends React.Component<{}, MyState> {
  constructor (props) {
    super(props);
    this.state = {
      teams: {},
      seasonsWithTeamNames: {},
      activeView: null as any
    };
  }

  componentDidMount () {
    const seasonsData = {};
    for (const season of Object.values(seasons)) {
      axios.get(season)
        .then(res => {
          return parseData(res.data);
        })
        .then(parsedData => {
          const currentSeason = parsedData.data[0];
          seasonsData[currentSeason] = {};
          seasonsData[currentSeason]['name'] = `season ${currentSeason}`;
          seasonsData[currentSeason]['teams'] = [];
          for (let i = 1; i < parsedData.data.length - 1; i++) {
            const currentTeams = { ...this.state.teams };
            const teamData = getTeamResults(parsedData.data[i]);
            seasonsData[currentSeason]['teams'].push(teamData.name);
            if (!(teamData.name in currentTeams)) {
              teamData.seasons[`season ${currentSeason}`] = teamData.latestSeasonScores;
              currentTeams[teamData.name] = teamData;
            } else {
              currentTeams[teamData.name].seasons[`season ${currentSeason}`] = teamData.latestSeasonScores;
            }
            this.setState({ teams: currentTeams });
            this.setState({ seasonsWithTeamNames: seasonsData });
          }
        });
    }
  }

  chooseView (chosenView) {
    this.setState({ activeView: chosenView });
  }

  render () {
    const activeView = this.state.activeView;
    let view;
    if (activeView === 'season') {
      view = <SeasonViewWrapper seasons={this.state.seasonsWithTeamNames} teams={this.state.teams}/>;
    } else if (activeView === 'team') {
      view = <TeamViewWrapper teams={this.state.teams}/>;
    }
    return (
      <div className={styles['general-view']}>
        <Header choice={this.chooseView.bind(this)}/>
        {view}
      </div>

    );
  }
}

export default App;
