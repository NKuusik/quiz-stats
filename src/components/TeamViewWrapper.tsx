import React from 'react';
import TeamView from './TeamView';
import {Team} from '../classes/EntityChildren/Team';
import * as styles from '../style.css';

type MyProps = {
  teams : {[teamName: string]: Team};
  seasonNames : Array<string>;
  fadeOut: string;
  collapseWidth: number;

  // Todo: it seems SeasonViewWrapper and TeamViewWrapper can be merged into a single component with the only difference
  // that activeEntry becomes   activeEntry: Season | Team | null and conditional rendering is expanded
  activeEntry: Team | null;
}

function TeamViewWrapper({
  teams,
  seasonNames,
  fadeOut,
  activeEntry,
  collapseWidth
} : MyProps) {
  let teamView;
  if (activeEntry != null) {
    teamView = <TeamView chosenTeam={activeEntry} seasonNames={seasonNames} allTeams={teams} collapseWidth={collapseWidth}/>;
  }
  return (
      <div id={styles[fadeOut]} >
        <div className={styles['chart-view']}>
          {teamView}
        </div>
      </div>
  );
}

export default TeamViewWrapper;
