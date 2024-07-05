import React from 'react';
import TeamView from './TeamView';
import MenuBar from './MenuBar';
import {Team} from '../classes/EntityChildren/Team';
import styles from '../style.css';

type MyProps = {
  teams : {[teamName: string]: Team};
  seasonNames : Array<string>;
  fadeOut: string;
  collapseMenuBarFunction: Function;
  chooseTeamFunction: Function;

  // Todo: it seems SeasonViewWrapper and TeamViewWrapper can be merged into a single component with the only difference
  // that activeEntry becomes   activeEntry: Season | Team | null and conditional rendering is expanded
  activeEntry: Team | null;
}

function TeamViewWrapper({
  teams,
  seasonNames,
  fadeOut,
  collapseMenuBarFunction,
  chooseTeamFunction,
  activeEntry
} : MyProps) {
  let teamView;
  if (activeEntry != null) {
    teamView = <TeamView chosenTeam={activeEntry} seasonNames={seasonNames} allTeams={teams}/>;
  }
  return (
      <div id={styles[fadeOut]} >
        <div className={styles['category-selection']}>
          <MenuBar viewType={'team'} choice={(chosenTeam: string) => { chooseTeamFunction(chosenTeam, teams); }} category={Object.keys(teams)} collapseFunction={() => { collapseMenuBarFunction(); }}/>
        </div>
        <div className={styles['chart-view']}>
          {teamView}
        </div>
      </div>
  );
}

export default TeamViewWrapper;
