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
  const [isAveragePointsView, setIsAveragePointsView] = useState<boolean>(true);
  const [comparisonTeams, setComparisonTeams] = useState<{[teamName: string]: Team}>({});
  const [cumulativeViewMaxValue, setCumulativeViewMaxValue] = useState<number>(20);
  const [averagePointsViewMaxValue, setAveragePointsViewMaxValue] = useState<number>(0);

  function handleCumulativeViewToggle() {
    setIsAveragePointsView(!isAveragePointsView);
  }

  function resetMaxValues(): void {
    setCumulativeViewMaxValue(0);
    setAveragePointsViewMaxValue(0);
  }


    // Reset cumulative view, when main team is changed
  useEffect(() => {
      setComparisonTeams({});
      resetMaxValues();
    }, [chosenTeam]);

  function generatePointsArray(team: Team, labels: string[], averagePointMode: boolean = true): number[] {
    const totalPointsAllSeasons : number[] = [];
    for (const seasonName of labels) {
      let sum: number = 0;
      let average: number = 0;
      if (team.results[seasonName] !== undefined) {
        const pointsAsNumbers = team.results[seasonName].map(Number);
        sum = pointsAsNumbers.reduce((a: number, b: number) => a + b, 0); // Kui Team klassil oleks info iga hooaja totalpointsist, pole seda vaja
        if (averagePointMode) {
          average = sum / team.results[seasonName].length;
        }
      }
      if (!averagePointMode && (sum > cumulativeViewMaxValue)) {
        setCumulativeViewMaxValue(sum);
      } else if (averagePointMode && (average > averagePointsViewMaxValue)) {
        setAveragePointsViewMaxValue(average);
      }
      if (!averagePointMode) {
        totalPointsAllSeasons.push(sum);
      } else if (averagePointMode) {
        totalPointsAllSeasons.push(average);
      }
    }
    return totalPointsAllSeasons;
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
    setComparisonTeams(comparisonTeamsInstance);
  }

  let lineChartComponent = <TeamViewSeasonal chosenTeam={chosenTeam} />;
  let additionalButtons;
  if (cumulativeView) {
    additionalButtons = <TeamViewAdditionalButtons 
      allTeams={allTeams} 
      collapseWidth={collapseWidth}
      isAveragePointsView={isAveragePointsView}
      statType={handleCumulativeViewToggle}
      handleTeamComparison={handleTeamComparison}/>;

    lineChartComponent = <TeamViewCumulative 
      chosenTeam={chosenTeam} 
      seasonNames={seasonNames} 
      isAveragePointsView={isAveragePointsView} 
      comparisonTeams={comparisonTeams}
      cumulativeViewMaxValue={cumulativeViewMaxValue}
      averagePointsViewMaxValue={averagePointsViewMaxValue}
      generatePointsArray={generatePointsArray}/>;
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
