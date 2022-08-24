import React from 'react';
import axios from 'axios';
import {parseData} from './scripts/readData';
import {Team} from './classes/EntityChildren/Team';
import {Season} from './classes/EntityChildren/Season';
import TeamViewWrapper from './components/TeamViewWrapper';
import SeasonViewWrapper from './components/SeasonViewWrapper';
import Header from './components/Header';
import {Transition} from 'react-transition-group';

type MyProps = {
  rawData: any;
}

type MyState = {
  teams: {[teamName: string]: Team};
  seasons: {[seasonName: string]: Season};
  activeView: string;
  viewTransition: boolean;
  backEndTeams: {[teamName: string]: Team};
}

class App extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      teams: {},
      seasons: {},
      activeView: '',
      viewTransition: false,
      backEndTeams: {},
    };
  }

  updateTeamData(allTeams: {[teamName: string]: Team}, teamRanking: number, currentTeamName: string,
    teamLatestSeasonScores: string[],
    teamTotalScore: number, currentSeasonName: string):
    {[teamName: string]: Team} {
    if (!(currentTeamName in allTeams)) {
      allTeams[currentTeamName] = new Team(currentTeamName, teamLatestSeasonScores, teamTotalScore);
    }
    allTeams[currentTeamName].normalizeGameScore(teamLatestSeasonScores, currentSeasonName);
    allTeams[currentTeamName].rankings[currentSeasonName] = teamRanking;
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
    axios.get('http://localhost:8080/quiz_stats/teams/').
      then((res) => {
        return res.data.results; // kõiki andmeid kohe lugeda aeglane
      }).then((results) =>{
        let output: {[teamName: string]: Team} = {};
        for (let teamData of results) {
          let team = new Team(teamData['name'], [], 0);
          team.teamSeasons = teamData['seasons'];
          team.rankings = teamData['rankings'];
          team.results = teamData['results'];
          output[team['name']] = team;
        }
        this.setState({teams: output});
        console.log('Done')
      }).then(() => {



    

    for (const season of Object.values(this.props.rawData)) {
      axios.get(season)
        .then((res: { data: string; }) => { // Mõtle, kas kogu see eraldi mooduliks
          return parseData(res.data);
        })
        .then((parsedData: { data: any[]; }) => {
          const currentSeasonName: string = `Season ${parsedData.data[0]}`;
          const currentSeasonTeamNames: string[] = [];
          const currentSeason = new Season(currentSeasonName);
          for (let i = 1; i < parsedData.data.length - 1; i++) {
            const rawTeamData: string[] = parsedData.data[i];
            const teamRanking: number = parseInt(rawTeamData[0]);
            const teamName: string = rawTeamData[1];
            const teamLatestSeasonScores: string[] = rawTeamData.slice(2, -1);
            const teamTotalScore: number = parseFloat(rawTeamData[rawTeamData.length - 1]);
            const allTeams: {[teamName: string]: Team} = this.updateTeamData({...this.state.teams}, teamRanking,
              teamName, teamLatestSeasonScores, teamTotalScore, currentSeasonName);
            // this.setState({teams: allTeams});
            currentSeason.totalGames = this.setAndValidateSeasonLength(currentSeason.totalGames, this.state.teams[teamName].results[currentSeasonName]);
            currentSeasonTeamNames.push(teamName);
            currentSeason.ranking[this.state.teams[teamName].rankings[currentSeasonName] - 1] = teamName;
          }
          this.validateCurrentSeasonRanking(currentSeasonName, currentSeason.ranking, currentSeasonTeamNames);
          for (const teamName of currentSeasonTeamNames) {
            currentSeason.teams[teamName] = this.state.teams[teamName];
            const teamsState = {...this.state.teams};
            teamsState[teamName].teamSeasons[currentSeasonName] = currentSeason;
            // this.setState({teams: teamsState});
          }
          parsedSeasons[currentSeasonName] = currentSeason;
        });
    }
  });
    this.setState({seasons: parsedSeasons});
  }

  chooseView(chosenView : string) {
    if (chosenView === this.state.activeView) {
      this.setState({viewTransition: false});
    } else {
      this.setState({activeView: chosenView});
      this.setState({viewTransition: true});
    }
  }

  fadeoutView(): string { 
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
          onExited={() => this.setState({activeView: ''})}>
          {() => view}
        </Transition>
      </div>

    );
  }
}

export default App;
