import React from 'react';
import TeamView from './TeamView';
import styles from '../style.css';

class CategoryView extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        activeTeam: null
      };
    }
    render(){
        return(
            <div>
                <div className={styles["select-category"]}>
                    <h1 >Hello, please choose the team you want to see.</h1>
                {Object.values(this.props.teams).map(team => (
                <div className={styles["select-team"]} onClick={() => this.props.chooseTeam(team)}>
                    {team.name}
                </div>
              ))}
              </div>
            </div>

        );
    }
}

export default CategoryView;