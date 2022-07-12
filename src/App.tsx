import React from 'react';
import axios from 'axios';
import {parseData, getTeamResults, normalizeGameScore} from './scripts/readData';
import {Team} from './classes/Team';
import {Season} from './classes/Season';
import TeamViewWrapper from './components/TeamViewWrapper';
import SeasonViewWrapper from './components/SeasonViewWrapper';
import Header from './components/Header';
import { Transition } from 'react-transition-group';

type MyProps = {
  rawData: any;
}

type MyState = {
  teams: {[teamName: string]: Team};
  seasons: {[seasonName: string]: Season};
  activeView: string;
  viewTransition: boolean
}

class App extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      teams: {},
      seasons: {},
      activeView: '',
      viewTransition: false
    };
  }

  updateTeamData(allTeams: {[teamName: string]: Team}, rawTeamData: string[], currentSeasonName: string): {[teamName: string]: Team} {
    if (!(rawTeamData[1] in allTeams)) {
      allTeams[rawTeamData[1]] = getTeamResults(rawTeamData);
    }
    allTeams[rawTeamData[1]].results[currentSeasonName] = normalizeGameScore(rawTeamData.slice(2, -1));
    allTeams[rawTeamData[1]].rankings[currentSeasonName] = parseInt(rawTeamData[0]);
    return allTeams;
  }

  setAndValidateSeasonLength(currentSeasonLength: number,
    latestSeasonScores: string[]): number {
    if (currentSeasonLength === 0) {
      currentSeasonLength = latestSeasonScores.length;
    } else if (currentSeasonLength !== latestSeasonScores.length) {
      throw new Error('Invalid team data: season length has already been determined, but does not match with the provided length');
    }
    return currentSeasonLength;
  }

  validateCurrentSeasonRanking(currentSeasonName: string, currentSeasonRanking: string[],
    currentSeasonTeams: string[]) {
    if (currentSeasonRanking.length !== currentSeasonTeams.length) {
      throw new Error('The number of teams in season rankings does not match ' +
        'with the actual number of teams');

    }
    for (const teamName of currentSeasonTeams) {
      if (currentSeasonRanking[this.state.teams[teamName].rankings[currentSeasonName] - 1] !== teamName) {
        throw new Error(`${teamName} is not in place ${this.state.teams[teamName].rankings[currentSeasonName]}.
          Found ${currentSeasonRanking[this.state.teams[teamName].rankings[currentSeasonName] - 1]} instead.`);
      }
    }
  }

  componentDidMount() {
    const parsedSeasons: {[seasonName: string]: Season} = {};
    for (const season of Object.values(this.props.rawData)) {
      axios.get(season)
        .then((res: { data: string; }) => {
          return parseData(res.data);
        })
        .then((parsedData: { data: any[]; }) => {
          const currentSeasonRanking: string[] = [];
          const currentSeasonName: string = `season ${parsedData.data[0]}`;
          let currentSeasonLength: number = 0;
          let currentSeasonTeams: {[teamName: string]: Team} = {};
          let currentSeasonTeamNames: string[] = [];
          for (let i = 1; i < parsedData.data.length - 1; i++) {
            let rawTeamData: string[] =  parsedData.data[i];
            let teamName: string = rawTeamData[1];
            const allTeams: {[teamName: string]: Team} = this.updateTeamData({...this.state.teams}, rawTeamData, currentSeasonName);
            this.setState({teams: allTeams});
            currentSeasonLength = this.setAndValidateSeasonLength(currentSeasonLength, this.state.teams[teamName].results[currentSeasonName]);
            currentSeasonTeamNames.push(teamName);
            currentSeasonRanking[this.state.teams[teamName].rankings[currentSeasonName]- 1] = teamName;
          }
          this.validateCurrentSeasonRanking(currentSeasonName, currentSeasonRanking, currentSeasonTeamNames);
          for (const teamName of currentSeasonTeamNames) {
            currentSeasonTeams[teamName] = this.state.teams[teamName];
          }
          const season = new Season(currentSeasonName, currentSeasonTeams, currentSeasonLength, currentSeasonRanking);
          for (const teamName of currentSeasonTeamNames) {
            this.state.teams[teamName].seasons[currentSeasonName] = season; 
          }
          parsedSeasons[currentSeasonName] = season;
        });
    }
    this.setState({seasons: parsedSeasons});
  }

  chooseView(chosenView : string) {
    if (chosenView === this.state.activeView) {
      this.setState({viewTransition: false})
    } else {
      this.setState({activeView: chosenView});
      this.setState({viewTransition: true})
    }
  }

  fadeoutView(): string { // Halb kood aga töötab, vaata üle
    if (this.state.viewTransition === false) {
      return 'fade-out';
    } else {
      return '';
    }
  }

  render() {
    const activeView = this.state.activeView;
    let view;
    if (activeView === 'season') {
      view = <SeasonViewWrapper fadeOut={this.fadeoutView()} seasons={this.state.seasons} />;
    } else if (activeView === 'team') {
      view = <TeamViewWrapper fadeOut={this.fadeoutView()} teams={this.state.teams} seasonNames={Object.keys(this.state.seasons)}/>;
    }
    return (
      <div>
        <Header activeView={activeView} choice={this.chooseView.bind(this)}/>
        <Transition
          in={this.state.viewTransition}
          timeout={450}
          onExited={() => this.setState({activeView: ''})}
        >
          {() => view}
        </Transition>
                   
      </div>
    );
  }
}

export default App;
