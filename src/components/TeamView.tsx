import React, {useState, useEffect} from 'react';
import * as styles from '../style.css';
import {Team} from '../classes/EntityChildren/Team';
import {visualizeActiveButton} from '../scripts/visualizeActiveButton';
import TeamViewSeasonal from './TeamViewSubComponents/TeamViewSeasonal';
import TeamViewCumulative from './TeamViewSubComponents/TeamViewCumulative';
import TeamViewAdditionalButtons from './TeamViewSubComponents/TeamViewAdditionalButtons';
import Grid from '@mui/material/Grid2';
import { SelectedEntriesProvider } from './Context/SelectedEntriesContext';

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
  const [selectedEntries, setSelectedEntries] = useState<Set<string>>(new Set())
  const teamViewGrid: [{[key: string]: number|string}, {[key: string]: number|string}] = 
    [{xs: 12, md: "auto"}, {xs: 12, md: "grow"}]

  useEffect(() => {
    setComparisonTeams({});
    setSelectedEntries(new Set())
  }, [chosenTeam]);


  const handleCumulativeViewToggle = () => {
    setIsAveragePointsView(!isAveragePointsView);
  }

  const handleTeamComparison = (teamName: string): void  =>  {
    handleSelectedEntries(teamName);
    const comparisonTeamsInstance: {[teamName: string]: Team} = {...comparisonTeams};
    if (Object.hasOwnProperty.call(comparisonTeams, teamName)) {
      delete comparisonTeamsInstance[teamName];
    } else {
      if (teamName !== chosenTeam.name) {
        comparisonTeamsInstance[teamName] = allTeams[teamName];
      }
    }
    setComparisonTeams(comparisonTeamsInstance);
  }

  const handleSelectedEntries = (entry: string): void => {
    if (chosenTeam.name !==  entry) {
      const currentSelection = new Set(selectedEntries);
      if (!selectedEntries.has(entry)) {
        currentSelection.add(entry)
      } else {
        currentSelection.delete(entry)
      }
  
      setSelectedEntries(currentSelection)
    }
  }

  let lineChartComponent = <TeamViewSeasonal chosenTeam={chosenTeam} />;
  let additionalButtons;
  if (cumulativeView) {
    additionalButtons = 
    <SelectedEntriesProvider selectedEntries={selectedEntries}>
      <TeamViewAdditionalButtons 
        allTeams={allTeams} 
        collapseWidth={collapseWidth}
        isAveragePointsView={isAveragePointsView}
        statType={handleCumulativeViewToggle}
        handleTeamComparison={handleTeamComparison}/>
    </SelectedEntriesProvider>

    lineChartComponent = <TeamViewCumulative 
      chosenTeam={chosenTeam} 
      seasonNames={seasonNames} 
      isAveragePointsView={isAveragePointsView} 
      comparisonTeams={comparisonTeams}/>;
  }

  let buttonStartText = 'See points';
  if (window.innerWidth < collapseWidth) {
    buttonStartText = '';
  }

  return (
        <div data-testid="team-view">
            <h1>Stats for team {chosenTeam.name}</h1>
            <Grid container>
              <Grid size={teamViewGrid[0]}>
                  <button id={styles[visualizeActiveButton('game-by-game', cumulativeView)]} className={styles['button-chart']} onClick={() => setCumulativeView(false)}>
                    {buttonStartText} per season
                  </button>
                  <button id={styles[visualizeActiveButton('cumulative', cumulativeView)]} className={styles['button-chart']} onClick={() => setCumulativeView(true)}>
                    {buttonStartText} across seasons
                  </button>
              </Grid>
              <Grid size={teamViewGrid[1]}>
                {additionalButtons}
              </Grid>
            </Grid>
            {lineChartComponent}
        </div>
  );
};

export default TeamView;
