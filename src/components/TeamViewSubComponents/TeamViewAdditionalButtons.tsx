import React from 'react';
import * as styles from '../../style.css';
import {Team} from '../../classes/EntityChildren/Team';
import TeamComparison from './TeamComparison';
import Grid from '@mui/material/Grid2';

type MyProps = {
  allTeams : {[teamName: string]: Team};
  collapseWidth: number,
  statType: () => void,
  isAveragePointsView: boolean,
  handleTeamComparison: (teamName: string) => void
}

const TeamViewAdditionalButtons = ({
    allTeams, 
    collapseWidth, 
    statType, 
    isAveragePointsView, 
    handleTeamComparison
  }: MyProps) => {

  let buttonStartText = 'See';

  if (window.innerWidth < collapseWidth) {
    buttonStartText = '';
  }

  const teamComparisonComponent = <TeamComparison 
    teams={allTeams} 
    comparisonTeamHandler={handleTeamComparison} 
    collapseWidth={collapseWidth}/>;

  let cumulativeViewButton =
    <button className={styles['button-chart']} onClick={() => statType()}>
      {buttonStartText} total points
    </button>;

  if (!isAveragePointsView) {
    cumulativeViewButton =
      <button className={styles['button-chart']} onClick={() => statType()}>
        {buttonStartText} average points
      </button>;
  }
  return (
      <span>
        <Grid container>
          <Grid size={{sm: 4, md:4, lg: 4}}>
            {cumulativeViewButton}
          </Grid>
          <Grid size={{sm: 0, md:4, lg: 4}} offset={{sm: 0, md: 0, lg: "auto"}}>
            {teamComparisonComponent}
          </Grid>
        </Grid>
      </span>
  );
};


export default TeamViewAdditionalButtons;