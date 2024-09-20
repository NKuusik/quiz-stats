import React, {useState, useEffect} from 'react';
import * as styles from '../style.css';
import {Team} from '../classes/EntityChildren/Team';
import {visualizeActiveButton} from '../scripts/visualizeActiveButton';
import TeamViewSeasonal from './TeamViewSubComponents/TeamViewSeasonal';
import TeamViewCumulative from './TeamViewSubComponents/TeamViewCumulative';
import TeamViewAdditionalButtons from './TeamViewSubComponents/TeamViewAdditionalButtons';
import Grid from '@mui/material/Grid2';

type MyProps = {
  chosenTeam: Team;
  seasonNames: string[];
  allTeams : {[teamName: string]: Team};
  collapseWidth: number;
}

const TeamView = ({chosenTeam, seasonNames, allTeams, collapseWidth}: MyProps) => {
  const [cumulativeView, setCumulativeView] = useState<boolean>(false);
  const [averageView, setAverageView] = useState<boolean>(true);
  const [comparisonTeams, setComparisonTeams] = useState<{[teamName: string]: Team}>({});
  const [cumulativeViewMaxValue, setCumulativeViewMaxValue] = useState<number>(0);
  const [averageViewMaxValue, setAverageViewMaxValue] = useState<number>(0);

  // Reset cumulative view, when main team is changed
  function handleCumulativeViewToggle() {
    setAverageView(!averageView);
  }

  function handleCumulativeViewMaxValue(value) {
      setCumulativeViewMaxValue(value)
  }

  function handleAverageViewMaxValue(value) {
    setAverageViewMaxValue(value)
  }
  
  function resetMaxValues(): void {
    setCumulativeViewMaxValue(0);
    setAverageViewMaxValue(0);
  }

  function handleTeamComparison(teamName: string): void {
    resetMaxValues();
    const comparisonTeamsInstance: {[teamName: string]: Team} = comparisonTeams;
    if (Object.hasOwnProperty.call(comparisonTeams, teamName)) {
      delete comparisonTeamsInstance[teamName];
    } else {
      if (teamName !== chosenTeam.name) {
        comparisonTeamsInstance[teamName] = allTeams[teamName];
      }
    }
    console.log('handleTeamComparison')
    setComparisonTeams(comparisonTeamsInstance);
    console.log(comparisonTeams)
  }

    // Reset cumulative view, when main team is changed
  useEffect(() => {
      setComparisonTeams({});
      resetMaxValues();
    }, [chosenTeam]);

  let lineChartComponent = <TeamViewSeasonal chosenTeam={chosenTeam} />;
  let additionalButtons;
  if (cumulativeView) {
    additionalButtons = <TeamViewAdditionalButtons 
      chosenTeam={chosenTeam} 
      seasonNames={seasonNames} 
      allTeams={allTeams} 
      collapseWidth={collapseWidth}
      averageView={averageView}
      statType={handleCumulativeViewToggle}
      handleTeamComparison={handleTeamComparison}/>;
    lineChartComponent = <TeamViewCumulative 
      chosenTeam={chosenTeam} 
      seasonNames={seasonNames} 
      allTeams={allTeams} 
      collapseWidth={collapseWidth} 
      averageView={averageView} 
      comparisonTeams={comparisonTeams}
      cumulativeViewMaxValue={cumulativeViewMaxValue}
      averageViewMaxValue={averageViewMaxValue}
      handleCumulativeViewMaxValue={handleCumulativeViewMaxValue}
      handleAverageViewMaxValue={handleAverageViewMaxValue}/>;
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
                {additionalButtons}
              </Grid>
            </Grid>
            {lineChartComponent}

        </div>
  );
};

export default TeamView;
