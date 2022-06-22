import React from 'react';
import * as seasons from './resources/seasons';
import axios from 'axios';
import { parseData, getTeamResults } from './scripts/readData';
import { Team } from './data_structures/Team';
import { Season } from './data_structures/Season';
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
    let seasonNames : Array<string> = [];
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
          let currentSeasonTeams = {};
          for (let i = 1; i < parsedData.data.length - 1; i++) {
            const allTeams = { ...this.state.teams };
            const teamData = getTeamResults(parsedData.data[i]);
            seasonsData[currentSeason]['teams'].push(teamData.name);
            if (!(teamData.name in allTeams)) { // Äkki see eraldi meetod: paneb õiged punktid õigesse hooaega.
              teamData.seasons[currentSeason] = teamData.latestSeasonScores;
              allTeams[teamData.name] = teamData;
            } else {
              allTeams[teamData.name].seasons[currentSeason] = teamData.latestSeasonScores;
            }
            currentSeasonTeams[teamData.name] = teamData;
            this.setState({ teams: allTeams });
            this.setState({ seasonsWithTeamNames: seasonsData });
          }
          let season = new Season(currentSeason, currentSeasonTeams);
          seasonNames.push(currentSeason);
          this.setState({ seasonNames: seasonNames});
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
