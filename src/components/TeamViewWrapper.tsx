import React from 'react';
import TeamView from './TeamView';
import MenuBar from './MenuBar';
import { Team } from '../scripts/readData';
import styles from '../style.css';

type MyProps = {
  teams : {[teamName: string]: Team};
  seasonNames : Array<string>;
}

type MyState = {
  activeTeam : Team | null
}

class TeamViewWrapper extends React.Component<MyProps, MyState> {
  constructor (props) {
    super(props);
    this.state = {
      activeTeam: null
    };
  };

  chooseTeam (chosenTeam : Team) {
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
      teamView = <TeamView team={this.state.activeTeam} seasonNames={this.props.seasonNames} />;
    }
    return (
      <div className={styles['view-wrapper']}>
        <div className={styles['category-selection']}>
        <MenuBar viewType={'team'} choice={this.chooseTeam.bind(this)} category={this.props.teams}/>
        </div>
        <div className={styles['chart-view']}>
        {teamView}
        </div>
      </div>
    );
  }
}

export default TeamViewWrapper;
