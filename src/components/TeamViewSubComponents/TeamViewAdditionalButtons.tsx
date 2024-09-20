import React, {useState, useEffect} from 'react';
import * as styles from '../../style.css';
import {Team} from '../../classes/EntityChildren/Team';
import TeamComparison from './TeamComparison';
import Grid from '@mui/material/Grid2';

type MyProps = {
  chosenTeam: Team;
  seasonNames: string[];
  allTeams : {[teamName: string]: Team};
  collapseWidth: number,
  statType: Function,
  averageView: boolean,
  handleTeamComparison: Function
}

const TeamViewAdditionalButtons = ({
    chosenTeam, seasonNames, allTeams, collapseWidth, 
    statType, averageView, handleTeamComparison}: MyProps) => {

  function generateLabels(): string[] {
    const labels : string[] = [];
    for (const season of seasonNames) {
      labels.push(season);
    }
    labels.sort();
    return labels;
  }
/*
  function resetMaxValues(): void {
    setCumulativeViewMaxValue(0);
    setAverageViewMaxValue(0);
  }

  function comparisonTeamHandler(teamName: string): void {
    resetMaxValues();
    const comparisonTeamsInstance: {[teamName: string]: Team} = comparisonTeams;
    if (Object.hasOwnProperty.call(comparisonTeams, teamName)) {
      delete comparisonTeamsInstance[teamName];
    } else {
      if (teamName !== chosenTeam.name) {
        comparisonTeamsInstance[teamName] = allTeams[teamName];
      }
    }
    setComparisonTeams(comparisonTeamsInstance);
  }
*/
/*
  // Reset cumulative view, when main team is changed
  useEffect(() => {
    setComparisonTeams({});
    //resetMaxValues();
  }, [chosenTeam]);
*/
  let buttonStartText = 'See';

  if (window.innerWidth < collapseWidth) {
    buttonStartText = '';
  }

  const teamComparisonComponent = <TeamComparison 
    teams={allTeams} 
    comparisonTeamHandler={handleTeamComparison} 
    collapseWidth={collapseWidth} />;
  let cumulativeViewButton =
    <button className={styles['button-chart']} onClick={() => statType()}>
      {buttonStartText} total points
    </button>;

  if (!averageView) {
    cumulativeViewButton =
      <button className={styles['button-chart']} onClick={() => statType()}>
        {buttonStartText} average points
      </button>;
  }

  return (
      <span>
        <Grid container>
          <Grid>
            {cumulativeViewButton}
          </Grid>
          <Grid size={{sm: 12, md:5, lg: 4}} offset={{sm: 0, md: 0, lg: "auto"}}>
            {teamComparisonComponent}
          </Grid>
        </Grid>
      </span>

  );
};


export default TeamViewAdditionalButtons;