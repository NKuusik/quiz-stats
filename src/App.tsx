import React from 'react';
import axios from 'axios';
import {parseData} from './scripts/readData';
import {Team} from './classes/EntityChildren/Team';
import {Season} from './classes/EntityChildren/Season';
import TeamViewWrapper from './components/TeamViewWrapper';
import SeasonViewWrapper from './components/SeasonViewWrapper';
import Header from './components/Header';
import {Transition} from 'react-transition-group';
import styles from './style.css';

type MyProps = {
  rawData: any;
  collapseWidth: number;
}

type MyState = {
  teams: {[teamName: string]: Team};
  seasons: {[seasonName: string]: Season};
  activeView: string;
  viewTransition: boolean;
  categorySelectionStyle: any;
  activeEntry: Season | Team | null;
}

class App extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      teams: {},
      seasons: {},
      activeView: '',
      viewTransition: false,
      categorySelectionStyle: styles['app-wrapper'],
      activeEntry: null
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

  chooseEntry(entryName: string, data: {[key: string]: Season} | {[key: string]: Team}) {
    if (this.state.activeEntry === data[entryName]) {
      this.setState({activeEntry: null});
    } else {
      this.setState({activeEntry: data[entryName]});
    }
  }

  componentDidMount() {
    const parsedSeasons: {[seasonName: string]: Season} = {};
    this.extendMenuBar(this.props.collapseWidth);
    for (const season of Object.values(this.props.rawData)) {
      axios.get(season)
        .then((res: { data: string; }) => { // Mõtle, kas kogu see eraldi mooduliks
          return parseData(res.data);
        })
        .then((parsedData: { data: any[]; }) => {
          const currentSeasonName: string = `season ${parsedData.data[0]}`;
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
            this.setState({teams: allTeams});
            currentSeason.totalGames = this.setAndValidateSeasonLength(currentSeason.totalGames, this.state.teams[teamName].results[currentSeasonName]);
            currentSeasonTeamNames.push(teamName);
            currentSeason.ranking[this.state.teams[teamName].rankings[currentSeasonName] - 1] = teamName;
          }
          this.validateCurrentSeasonRanking(currentSeasonName, currentSeason.ranking, currentSeasonTeamNames);
          for (const teamName of currentSeasonTeamNames) {
            currentSeason.teams[teamName] = this.state.teams[teamName];
            const teamsState = {...this.state.teams};
            teamsState[teamName].teamSeasons[currentSeasonName] = currentSeason;
            this.setState({teams: teamsState});
          }
          parsedSeasons[currentSeasonName] = currentSeason;
        });
    }
    this.setState({seasons: parsedSeasons});

    window.addEventListener('resize', () => {
      this.extendMenuBar(this.props.collapseWidth);
    });
  }

  chooseView(chosenView : string) {
    const width = window.innerWidth;
    if (chosenView === this.state.activeView && width > this.props.collapseWidth) {
      this.setState({viewTransition: false});
    } else {
      this.setState({activeView: chosenView});
      this.setState({viewTransition: true});
    }

    this.setState({activeEntry: null});
  }

  fadeoutView(): string { // Halb kood aga töötab, vaata üle
    if (this.state.viewTransition === false) {
      return 'fade-out';
    } else {
      return '';
    }
  }

  extendMenuBar(collapseWidth: number): void {
    const width = window.innerWidth;
    if (width < collapseWidth && this.state.categorySelectionStyle === styles['app-wrapper']) {
      if (this.state.activeEntry === null) {
        this.setState({categorySelectionStyle: styles['app-wrapper-extended']});
      } else {
        this.setState({categorySelectionStyle: styles['app-wrapper-collapsed']});
      }
    } else if (width > collapseWidth) {
      this.setState({categorySelectionStyle: styles['app-wrapper']});
    }
  }

  transitionCollapsedToExtendedView(collapseWidth: number): void {
    const width = window.innerWidth;
    if (width < collapseWidth && this.state.categorySelectionStyle === styles['app-wrapper-collapsed']) {
      this.setState({categorySelectionStyle: styles['app-wrapper-extended']});
    }
  }

  collapseMenuBar(collapseWidth: number): void {
    const width = window.innerWidth;
    if (width < collapseWidth) {
      this.setState({categorySelectionStyle: styles['app-wrapper-collapsed']});
    }
  }

  render() {
    const activeView = this.state.activeView;
    let view;
    if (activeView === 'season') {
      view = <SeasonViewWrapper
        fadeOut={this.fadeoutView()}
        seasons={this.state.seasons}
        collapseMenuBarFunction={() => this.collapseMenuBar(this.props.collapseWidth)}
        chooseSeasonFunction={(chosenSeason) => this.chooseEntry(chosenSeason, this.state.seasons)}
        activeEntry={this.state.activeEntry as Season | null}
        />;
    } else if (activeView === 'team') {
      view = <TeamViewWrapper
        fadeOut={this.fadeoutView()}
        teams={this.state.teams}
        seasonNames={Object.keys(this.state.seasons)}
        collapseMenuBarFunction={() => this.collapseMenuBar(this.props.collapseWidth)}
        chooseTeamFunction={(chosenTeam) => this.chooseEntry(chosenTeam, this.state.teams)}
        activeEntry={this.state.activeEntry as Team | null}
        />;
    }
    return (
      <div className={this.state.categorySelectionStyle}>
        <Header
          activeView={activeView}
          choice={this.chooseView.bind(this)}
          smallLayoutTransitions={() => { this.transitionCollapsedToExtendedView(this.props.collapseWidth); }}
          />
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
