import React, {useState, useEffect} from 'react';
import LineChart from '../../subcomponents/LineChart';
import styles from '../../style.css';
import {Team} from '../../classes/EntityChildren/Team';
import {ChartDataSet} from '../../classes/ChartDataSet';
import TeamComparison from './TeamComparison';

type MyProps = {
  chosenTeam: Team;
  seasonNames: string[];
  allTeams : {[teamName: string]: Team};
}

const TeamViewCumulative = ({chosenTeam, seasonNames, allTeams}: MyProps) => {
  const [averageView, setAverageView] = useState<boolean>(true);
  const [comparisonTeams, setComparisonTeams] = useState<{[teamName: string]: Team}>({});
  const [cumulativeViewMaxValue, setCumulativeViewMaxValue] = useState<number>(0);
  const [averageViewMaxValue, setAverageViewMaxValue] = useState<number>(0);
  const cumulativeLabels: string[] = generateLabels();

  function resetMaxValues(): void {
    setCumulativeViewMaxValue(0);
    setAverageViewMaxValue(0);
  }

  function comparisonTeamHandler(teamName: string): void {
    resetMaxValues();
    const comparisonTeamsInstance: {[teamName: string]: Team} = comparisonTeams;
    if (comparisonTeams.hasOwnProperty(teamName)) {
      delete comparisonTeamsInstance[teamName];
    } else {
      if (teamName !== chosenTeam.name) {
        comparisonTeamsInstance[teamName] = allTeams[teamName];
      }
    }
    setComparisonTeams(comparisonTeamsInstance);
  }

  // Reset cumulative view, when main team is changed
  useEffect(() => {
    setComparisonTeams({});
    resetMaxValues();
  }, [chosenTeam]);

  function generateLabels(): string[] {
    const labels : string[] = [];
    for (const season of seasonNames) {
      labels.push(season);
    }
    labels.sort();
    return labels;
  }

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
      } else if (averagePointMode && (average > averageViewMaxValue)) {
        setAverageViewMaxValue(average);
      }
      if (!averagePointMode) {
        totalPointsAllSeasons.push(sum);
      } else if (averagePointMode) {
        totalPointsAllSeasons.push(average);
      }
    }
    return totalPointsAllSeasons;
  }


  function generateDataSets(averagePointsMode: boolean = true): ChartDataSet[] {
    const displayedTeams = [chosenTeam].concat(Object.values(comparisonTeams));
    const chartDataSets: ChartDataSet[] = [];
    for (const currentTeam of displayedTeams) {
      if (currentTeam !== undefined) {
        let points: number[] = [];
        let teamLabel: string = '';
        points = generatePointsArray(currentTeam, cumulativeLabels, averagePointsMode);
        if (averagePointsMode) {
          teamLabel = `Average points for ${currentTeam.name}.`;
        } else {
          teamLabel = `Total points for ${currentTeam.name}.`;
        }
        const dataColor : string = currentTeam.color;
        const chartDataSet = new ChartDataSet(false, teamLabel, points, dataColor, dataColor, 1.5, 0.5);
        chartDataSets.push(chartDataSet);
      }
    }
    // Sets thicker line for the chosen team.
    chartDataSets[0].borderWidth = 5.0;
    return chartDataSets;
  }

  let lineChartComponent = <LineChart maxValue={averageViewMaxValue} titleContent={'Average points across seasons'} dataSets={generateDataSets(true)} labels={cumulativeLabels} />;
  const teamComparisonComponent = <TeamComparison teams={allTeams} comparisonTeamHandler={comparisonTeamHandler} />;
  let cumulativeViewButton =
    <button className={styles['button-chart']} onClick={() => setAverageView(false)}>
      See total points
    </button>;

  if (!averageView) {
    lineChartComponent = <LineChart maxValue={cumulativeViewMaxValue} titleContent={'Total points across seasons'} dataSets={generateDataSets(false)} labels={cumulativeLabels} />;
    cumulativeViewButton =
      <button className={styles['button-chart']} onClick={() => setAverageView(true)}>
        See average points
      </button>;
  }

  return (
      <span>
        {cumulativeViewButton}
        {teamComparisonComponent}
        {lineChartComponent}
      </span>

  );
};

export default TeamViewCumulative;
