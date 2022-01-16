import React from 'react';
import TeamView from './TeamView';
import CategoryView from './CategoryView';
import { Team } from '../scripts/readData';

type MyProps = {
  teams : Object

}

type MyState = {
  activeTeam : Team
}

class TeamViewWrapper extends React.Component<MyProps, MyState> {
  constructor (props) {
    super(props);
    this.state = {
      activeTeam: null as unknown as Team
    };
  };

  chooseTeam (chosenTeam : Team) {
    this.setState({
      activeTeam: chosenTeam
    });
  }

  render () {
    if (this.state.activeTeam == null) {
      return (
            <div>
                <h1>Choose which team you want to check.</h1>
                <CategoryView choice={this.chooseTeam.bind(this)} category={this.props.teams}/>;
            </div>
      );
    } else {
      return <TeamView chooseTeam={this.chooseTeam.bind(this)} team={this.state.activeTeam} />;
    }
  }
}

export default TeamViewWrapper;
