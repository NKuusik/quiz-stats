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
  backendSeasons: {[seasonName: string]: Season};

}

class App extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      teams: {},
      seasons: {},
      activeView: '',
      viewTransition: false,
      backendSeasons: {}
    };
  }

  componentDidMount() {
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
        console.log('Teams done')
      }).then(() => {
      axios.get('http://localhost:8080/quiz_stats/seasons/').
        then((res) => {
        return res.data.results;
      }).then((results) => {
        let output: {[teamName: string]: Season} = {};
        for (let seasonData of results) {
          let teamsInSeason = {}
          let ranking: string[] = []
          let season: Season = new Season(seasonData['name'], 
            teamsInSeason, seasonData['length']);
          for (let teamName of seasonData['teams_in_season']) { // Siin lihtsusta/vaata yle
            teamsInSeason[teamName] = this.state.teams[teamName];
            ranking[this.state.teams[teamName].rankings[seasonData['name']] - 1] = teamName
            this.state.teams[teamName].teamSeasons[season.name] = season;
          }
          season.ranking = ranking;
        output[season.name] = season;
      }
      this.setState({seasons: output});
    });
  });    
    
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
