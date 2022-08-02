import React, {useState} from 'react';
import styles from '../style.css';
import {Team} from '../classes/EntityChildren/Team';
import {visualizeActiveButton} from '../scripts/visualizeActiveButton';
import TeamViewSeasonal from './TeamViewSeasonal';
import TeamViewCumulative from './TeamViewCumulative';

type MyProps = {
  chosenTeam: Team;
  seasonNames: string[];
  allTeams : {[teamName: string]: Team};
}

enum ViewType {
  Seasonal = 'Seasonal',
  Average = 'Average',
  Cumulative = 'Cumulative'
}

// ...View komponendid väiksemaks?
const TeamView = ({chosenTeam, seasonNames, allTeams}: MyProps) => {
  const [cumulativeView, setCumulativeView] = useState<boolean>(false); // Todo: replace boolean with enum ViewType

  // Reset cumulative view, when main team is changed
  let lineChartComponent = <TeamViewSeasonal chosenTeam={chosenTeam} />;

  if (cumulativeView) {
    lineChartComponent = <TeamViewCumulative chosenTeam={chosenTeam} seasonNames={seasonNames} allTeams={allTeams} />
  }

  return (
        <div className={styles['team-view']}>
            <h1>Stats for team {chosenTeam.name}</h1>
            <button id={styles[visualizeActiveButton('game-by-game', cumulativeView)]} className={styles['button-chart']} onClick={() => setCumulativeView(false)}>
              See points per season
            </button>
            <button id={styles[visualizeActiveButton('cumulative', cumulativeView)]} className={styles['button-chart']} onClick={() => setCumulativeView(true)}>
              See points across seasons
            </button>
            {lineChartComponent}
        </div>
  );
};

export default TeamView;
