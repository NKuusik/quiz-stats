import React from 'react';
import TeamView from './TeamView';
import MenuBar from './MenuBar';
import { Team } from '../scripts/readData';
import styles from '../style.css';

type MyProps = {
  teams : Object

}

type MyState = {
  activeTeam : any
}

class TeamViewWrapper extends React.Component<MyProps, MyState> {
  constructor (props) {
    super(props);
    this.state = {
      activeTeam: null as unknown as Team
    };
  };

  chooseTeam (chosenTeam : any) {
    if (this.state.activeTeam === chosenTeam) {
      this.setState({
        activeTeam: null
      });
    } else {
      this.setState({
        activeTeam: chosenTeam
      });
    }
  }

  render () {
    let teamView;
    if (this.state.activeTeam != null) {
      teamView = <TeamView team={this.state.activeTeam} />;
    }
    return (
      <div className={styles['view-wrapper']}>
        <div className={styles['category-selection']}>
        <MenuBar choice={this.chooseTeam.bind(this)} category={this.props.teams}/>
        </div>
        <div className={styles['chart-view']}>
        {teamView}
        </div>
      </div>
    );
  }
}

export default TeamViewWrapper;
