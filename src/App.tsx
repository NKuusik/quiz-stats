import React from 'react';
import * as seasons from './resources/seasons';
import axios from 'axios';
import { parseData, getTeamResults } from './scripts/readData';
import { Team } from './classes/Team';
import { Season } from './classes/Season';
import TeamViewWrapper from './components/TeamViewWrapper';
import SeasonViewWrapper from './components/SeasonViewWrapper';
import Header from './components/Header';

type MyState = {
  teams: {[teamName: string]: Team};
  seasons: {[seasonName: string]: Season};
  activeView: string;
}

class App extends React.Component<{}, MyState> {
  constructor (props) {
    super(props);
    this.state = {
      teams: {},
      seasons: {},
      activeView: ""
    };
  }

  componentDidMount () {
    const seasonsData = {};
    let seasonNames : Array<string> = [];
    for (const season of Object.values(seasons)) {
      axios.get(season)
        .then(res => {
          return parseData(res.data);
        })
        .then(parsedData => {

          let currentSeasonRanking: string[];
          currentSeasonRanking = [];
          const currentSeasonName = `season ${parsedData.data[0]}`;
          let currentSeasonLength;
          seasonsData[currentSeasonName] = {};
          seasonsData[currentSeasonName]['name'] = currentSeasonName;
          seasonsData[currentSeasonName]['teams'] = [];
          let currentSeasonTeams = {};
          for (let i = 1; i < parsedData.data.length - 1; i++) {
            const allTeams = { ...this.state.teams };
            const teamData = getTeamResults(parsedData.data[i]);
            seasonsData[currentSeasonName]['teams'].push(teamData.name);
            teamData.seasons[currentSeasonName] = teamData.latestSeasonScores;
            if (!(teamData.name in allTeams)) { // Äkki see eraldi meetod: paneb õiged punktid õigesse hooaega.
              allTeams[teamData.name] = teamData;
            } else {
              allTeams[teamData.name].seasons[currentSeasonName] = teamData.latestSeasonScores;
            }
            currentSeasonLength = teamData.latestSeasonScores.length - 1; //Vajab testi
            currentSeasonTeams[teamData.name] = teamData;
            currentSeasonRanking[teamData.place - 1] = teamData.name; // Testi
            this.setState({ teams: allTeams });
          }
          let season = new Season(currentSeasonName, currentSeasonTeams, currentSeasonLength, currentSeasonRanking);
          seasonsData[currentSeasonName] = season;
          seasonNames.push(currentSeasonName);
        });
    }
    this.setState({seasons: seasonsData});
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
      view = <SeasonViewWrapper seasons={this.state.seasons} />;
    } else if (activeView === 'team') {
      view = <TeamViewWrapper teams={this.state.teams} seasonNames={Object.keys(this.state.seasons)}/>;
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
