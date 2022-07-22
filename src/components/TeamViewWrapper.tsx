import React, {useState} from 'react';
import TeamView from './TeamView';
import MenuBar from './MenuBar';
import {Team} from '../classes/EntityChildren/Team';
import styles from '../style.css';

type MyProps = {
  teams : {[teamName: string]: Team};
  seasonNames : Array<string>;
  fadeOut: string;
}

function TeamViewWrapper({teams, seasonNames, fadeOut} : MyProps) {
  const [activeTeam, setActiveTeam] = useState<Team | null>(null);

  function chooseTeam(chosenTeam: Team) {
    if (activeTeam === chosenTeam) {
      setActiveTeam(null);
    } else {
      setActiveTeam(chosenTeam);
    }
  }
  let teamView;
  if (activeTeam != null) {
    teamView = <TeamView team={activeTeam} seasonNames={seasonNames} />;
  }
  return (
      <div id={styles[fadeOut]} className={styles['view-wrapper']}>
        <div className={styles['category-selection']}>
        <MenuBar viewType={'team'} choice={(chosenTeam) => { chooseTeam(chosenTeam); }} category={teams}/>
        </div>
        <div className={styles['chart-view']}>
        {teamView}
        </div>
      </div>
  );
}

export default TeamViewWrapper;
