import React from 'react';
import axios from 'axios';
import { parseData, getTeamResults } from './scripts/readData';
import { Team } from './classes/Team';
import { Season } from './classes/Season';
import TeamViewWrapper from './components/TeamViewWrapper';
import SeasonViewWrapper from './components/SeasonViewWrapper';
import Header from './components/Header';


type MyProps = {
  rawData: any;
}

type MyState = {
  teams: {[teamName: string]: Team};
  seasons: {[seasonName: string]: Season};
  activeView: string;
}

class App extends React.Component<MyProps, MyState> {
  constructor (props: MyProps) {
    super(props);
    this.state = {
      teams: {},
      seasons: {},
      activeView: ""
    };
  }

  updateTeamData(allTeams: {[teamName: string]: Team}, currentTeam: Team, currentSeasonName: string): {[teamName: string]: Team}{
    if (!(currentTeam.name in allTeams)) { 
      allTeams[currentTeam.name] = currentTeam;
    }
    allTeams[currentTeam.name].seasons[currentSeasonName] = currentTeam.latestSeasonScores;
    return allTeams;
  }

  setAndValidateSeasonLength(currentSeasonLength: number, 
    latestSeasonScores: string[]): number {
    if (currentSeasonLength === 0) {
      currentSeasonLength = latestSeasonScores.length;
    } else if (currentSeasonLength !== latestSeasonScores.length) {
      throw new Error(`Invalid team data: season length has already been determined, but does not match with the provided length`);
    }
    return currentSeasonLength;
  }

  componentDidMount () {
    const parsedSeasons: {[seasonName: string]: Season} = {};
    let seasonNames : string[] = [];
    for (const season of Object.values(this.props.rawData)) {
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
            team.seasons[currentSeasonName] = team.latestSeasonScores;
            const allTeams = this.updateTeamData({ ...this.state.teams }, team, currentSeasonName);
            currentSeasonLength = this.setAndValidateSeasonLength(currentSeasonLength, team.latestSeasonScores);
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
