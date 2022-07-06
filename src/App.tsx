import React from 'react';
import * as rawData from './resources/seasons';
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
  constructor (props: Object) {
    super(props);
    this.state = {
      teams: {},
      seasons: {},
      activeView: ""
    };
  }

  updateTeamData(previousTeams: {[teamName: string]: Team}, currentTeam: Team, currentSeasonName: string): {[teamName: string]: Team}{
    if (!(currentTeam.name in previousTeams)) { 
      previousTeams[currentTeam.name] = currentTeam;
    } else {
      previousTeams[currentTeam.name].seasons[currentSeasonName] = currentTeam.latestSeasonScores;
    }
    return previousTeams;
  }

  componentDidMount () {
    const parsedSeasons: {[seasonName: string]: Season} = {};
    let seasonNames : string[] = [];
    for (const season of Object.values(rawData)) {
      axios.get(season)
        .then((res: { data: string; }) => {
          return parseData(res.data);
        })
        .then((parsedData: { data: any[]; }) => {
          let currentSeasonRanking: string[] = [];
          const currentSeasonName: string = `season ${parsedData.data[0]}`;
          let currentSeasonLength: number = 0;
          let currentSeasonTeams: {[teamName: string]: Team} = {};
          for (let i = 1; i < parsedData.data.length - 1; i++) {
            const team: Team = getTeamResults(parsedData.data[i]);
            const allTeams = this.updateTeamData({ ...this.state.teams }, team, currentSeasonName);
            team.seasons[currentSeasonName] = team.latestSeasonScores;
            currentSeasonLength = team.latestSeasonScores.length - 1; //Vajab testi
            currentSeasonTeams[team.name] = team;
            currentSeasonRanking[team.place - 1] = team.name; // Testi
            this.setState({ teams: allTeams });
          }
          let season = new Season(currentSeasonName, currentSeasonTeams, currentSeasonLength, currentSeasonRanking);
          parsedSeasons[currentSeasonName] = season;
          seasonNames.push(currentSeasonName);
        });
    }
    this.setState({seasons: parsedSeasons});
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
