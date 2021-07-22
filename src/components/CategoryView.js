import { DivisionSign } from 'keyboard-key';
import React, {useState} from 'react';
import TeamView from './TeamView';
import styles from '../style.css';

class CategoryView extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        teams: [],
        activeTeam: null
      };
    }
    chooseTeam(chosenTeam) { //ToDo: make toggleable.
        this.setState({
          activeTeam: chosenTeam.name
        });
      }
    render(){
        return(
            <div>
                <div className={styles["select-category"]}>
                    <h1 >Hello, please choose the team you want to see.</h1>
                {this.props.teams.map(team => (
                <div className={styles["select-team"]} onClick={() => this.chooseTeam(team)}>
                    {team.name}
                    {this.state.activeTeam == team.name && <TeamView team={team}/>}
                </div>
              ))}
              </div>
            </div>

        );
    }
}

export default CategoryView;