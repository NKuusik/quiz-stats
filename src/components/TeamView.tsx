import React, {useState} from 'react';
import * as styles from '../style.css';
import {Team} from '../classes/EntityChildren/Team';
import {visualizeActiveButton} from '../scripts/visualizeActiveButton';
import TeamViewSeasonal from './TeamViewSubComponents/TeamViewSeasonal';
import TeamViewCumulative from './TeamViewSubComponents/TeamViewCumulative';
import Grid from '@mui/material/Grid2';

type MyProps = {
  chosenTeam: Team;
  seasonNames: string[];
  allTeams : {[teamName: string]: Team};
  collapseWidth: number;
}

const TeamView = ({chosenTeam, seasonNames, allTeams, collapseWidth}: MyProps) => {
  const [cumulativeView, setCumulativeView] = useState<boolean>(false);

  // Reset cumulative view, when main team is changed
  let lineChartComponent = <TeamViewSeasonal chosenTeam={chosenTeam} />;

  if (cumulativeView) {
    lineChartComponent = <TeamViewCumulative chosenTeam={chosenTeam} seasonNames={seasonNames} allTeams={allTeams} collapseWidth={collapseWidth} />;
  }

  let buttonStartText = 'See points';
  if (window.innerWidth < collapseWidth) {
    buttonStartText = '';
  }

  return (
        <div data-testid="team-view">
            <h1>Stats for team {chosenTeam.name}</h1>
            <Grid container>
              <Grid size={"auto"}>
                  <button id={styles[visualizeActiveButton('game-by-game', cumulativeView)]} className={styles['button-chart']} onClick={() => setCumulativeView(false)}>
                    {buttonStartText} per season
                  </button>
                  <button id={styles[visualizeActiveButton('cumulative', cumulativeView)]} className={styles['button-chart']} onClick={() => setCumulativeView(true)}>
                    {buttonStartText} across seasons
                  </button>
              </Grid>
              <Grid size="grow">
                <TeamViewCumulative chosenTeam={chosenTeam} seasonNames={seasonNames} allTeams={allTeams} collapseWidth={collapseWidth} />
                {/**{lineChartComponent}*/}
              </Grid>
            </Grid>
            <TeamViewSeasonal chosenTeam={chosenTeam} />

        </div>
  );
};

export default TeamView;
