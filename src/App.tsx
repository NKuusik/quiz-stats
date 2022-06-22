import React from 'react';
import * as seasons from './resources/seasons';
import axios from 'axios';
import { parseData, getTeamResults } from './scripts/readData';
import { Team } from './data_structures/Team';
import TeamViewWrapper from './components/TeamViewWrapper';
import SeasonViewWrapper from './components/SeasonViewWrapper';
import Header from './components/Header';

type MyState = {
  teams: {[teamName: string]: Team};
  seasonsWithTeamNames: {[seasonName: string]: {name: string, teams: string[]}};
  seasonNames: Array<string>;
  activeView: string;
}

class App extends React.Component<{}, MyState> {
  constructor (props) {
    super(props);
    this.state = {
      teams: {},
      seasonsWithTeamNames: {},
      seasonNames: [],
      activeView: ""
    };
  }

  componentDidMount () {
    const seasonsData = {};
    let maxSeasons = 0;
    for (const season of Object.values(seasons)) {
      axios.get(season)
        .then(res => {
          return parseData(res.data);
        })
        .then(parsedData => {
          const currentSeason = `season ${parsedData.data[0]}`;
          seasonsData[currentSeason] = {};
          seasonsData[currentSeason]['name'] = currentSeason;
          seasonsData[currentSeason]['teams'] = [];
          for (let i = 1; i < parsedData.data.length - 1; i++) {
            const currentTeams = { ...this.state.teams };
            const teamData = getTeamResults(parsedData.data[i]);
            seasonsData[currentSeason]['teams'].push(teamData.name);
            if (!(teamData.name in currentTeams)) {
              teamData.seasons[currentSeason] = teamData.latestSeasonScores;
              currentTeams[teamData.name] = teamData;
            } else {
              currentTeams[teamData.name].seasons[currentSeason] = teamData.latestSeasonScores;
            }
            this.setState({ teams: currentTeams });
            this.setState({ seasonsWithTeamNames: seasonsData });
            if (Object.keys(seasonsData).length > maxSeasons) { // Hacky, hooajad vajavad paremat andmestruktuuri.
              this.setState( {seasonNames: Object.keys(seasonsData) })
              maxSeasons = Object.keys(seasonsData).length
            }
          }
        });
    }
  }

  chooseView (chosenView : string) {
    if (chosenView === this.state.activeView) {
      this.setState({ activeView: "" });
    } else {
      this.setState({ activeView: chosenView });
    }
  }

  render () {
    console.log(this.state.teams)
    const activeView = this.state.activeView;
    let view;
    if (activeView === 'season') {
      view = <SeasonViewWrapper seasons={this.state.seasonsWithTeamNames} teams={this.state.teams}/>;
    } else if (activeView === 'team') {
      view = <TeamViewWrapper teams={this.state.teams} seasonNames={this.state.seasonNames}/>;
    }
    return (
      <div>
        <Header activeView={activeView} choice={this.chooseView.bind(this)}/>
        {view}
      </div>

    );
  }
}

export default App;
