import React, {useState} from 'react';
import TeamView from './TeamView';
import MenuBar from './MenuBar';
import {Team} from '../classes/EntityChildren/Team';
import styles from '../style.css';

type MyProps = {
  teams : {[teamName: string]: Team};
  seasonNames : Array<string>;
  fadeOut: string;
  categorySelectionStyle: any;
  collapseMenuBarFunction: Function;
}

function TeamViewWrapper({teams, seasonNames, fadeOut, categorySelectionStyle, collapseMenuBarFunction} : MyProps) {
  const [activeTeam, setActiveTeam] = useState<Team | null>(null);

  function chooseTeam(teamName: string) {
    if (activeTeam === teams[teamName]) {
      setActiveTeam(null);
    } else {
      setActiveTeam(teams[teamName]);
    }
  }
  let teamView;
  if (activeTeam != null) {
    teamView = <TeamView chosenTeam={activeTeam} seasonNames={seasonNames} allTeams={teams}/>;
  }
  return (
      <div id={styles[fadeOut]} className={styles['view-wrapper']}>
        <div className={categorySelectionStyle}>
          <MenuBar viewType={'team'} choice={(chosenTeam: string) => { chooseTeam(chosenTeam); }} category={Object.keys(teams)} collapseFunction={() => {collapseMenuBarFunction()}}/>
        </div>
        <div className={styles['chart-view']}>
          {teamView}
        </div>
      </div>
  );
}

export default TeamViewWrapper;
