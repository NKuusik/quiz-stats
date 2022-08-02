import React, {useState, useEffect} from 'react';
import LineChart from '../subcomponents/LineChart';
import styles from '../style.css';
import {Team} from '../classes/EntityChildren/Team';
import {ChartDataSet} from '../classes/ChartDataSet';
import {visualizeActiveButton} from '../scripts/visualizeActiveButton';
import TeamComparison from './TeamComparison';

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
  const defaultDataSetsShown : number = 3;
  const [cumulativeView, setCumulativeView] = useState<boolean>(false); // Todo: replace boolean with enum ViewType
  const [averageView, setAverageView] = useState<boolean>(true);
  const [comparisonTeams, setComparisonTeams] = useState<{[teamName: string]: Team}>({});
  const [cumulativeViewMaxValue, setCumulativeViewMaxValue] = useState(0);
  const [averageViewMaxValue, setAverageViewMaxValue] = useState(0);

  function comparisonTeamHandler(teamName: string): void {
    setCumulativeViewMaxValue(0); // Reset this value every time setComparisonTeam changes.
    setAverageViewMaxValue(0);
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
    setCumulativeViewMaxValue(0);
    setAverageViewMaxValue(0);
  }, [chosenTeam]);

  function generateLabelsDefault(seasonsAsObject: Object): string[] {
    let longestSeason = [];
    for (const seasonKey in seasonsAsObject) {
      if (seasonsAsObject[seasonKey].length > longestSeason.length) {
        longestSeason = seasonsAsObject[seasonKey];
      }
    }
    const labels : string[] = [];
    for (let i = 1; i < longestSeason.length; i++) {
      labels.push(`Game #${i}`);
    }
    return labels;
  }

  function generateLabelsCumulative(): string[] {
    const labels : string[] = [];
    for (const season of seasonNames) {
      labels.push(season);
    }
    labels.sort();
    return labels;
  }

  function generateDataSetsSeason(): ChartDataSet[] {
    const arrayWithSeasonPoints : ChartDataSet[] = [];
    for (const seasonName of Object.keys(chosenTeam.results)) {
      const dataColor : string = chosenTeam.teamSeasons[seasonName].color;
      const label = `# of points in ${seasonName}`;
      const chartDataSet = new ChartDataSet(false, label, chosenTeam.results[seasonName], dataColor, dataColor, 1.5, 0.5);
      arrayWithSeasonPoints.push(chartDataSet);
      arrayWithSeasonPoints.sort((a, b) => (a.label > b.label) ? 1 : -1);
    }

    for (let i = defaultDataSetsShown; i < arrayWithSeasonPoints.length; i++) {
      arrayWithSeasonPoints[i].hidden = true;
    }
    return arrayWithSeasonPoints;
  }

  function generateTotalPointsArray(team: Team, labels: string[]): number[] {
    const totalPointsAllSeasons : number[] = [];
    for (const seasonName of labels) {
      let sum: number = 0;
      if (team.results[seasonName] !== undefined) {
        const pointsAsNumbers = team.results[seasonName].map(Number);
        sum = pointsAsNumbers.reduce((a: number, b: number) => a + b, 0); // Kui Team klassil oleks info iga hooaja totalpointsist, pole seda vaja
      }
      if (sum > cumulativeViewMaxValue) {
        setCumulativeViewMaxValue(sum);
      }
      totalPointsAllSeasons.push(sum);
    }
    return totalPointsAllSeasons;
  }

  function generateAveragePointsArray(team: Team, labels: string[]): number[] { // Todo: dubleerib generateTotalPointsArray-d. Refactor https://blog.logrocket.com/how-when-to-force-react-component-re-render/
    const averagePointsAllSeasons: number[] = [];
    for (const seasonName of labels) {
      let sum: number = 0;
      let average: number = 0;
      if (team.results[seasonName] !== undefined) {
        const pointsAsNumbers = team.results[seasonName].map(Number);
        sum = pointsAsNumbers.reduce((a: number, b: number) => a + b, 0); // Kui Team klassil oleks info iga hooaja totalpointsist, pole seda vaja
        average = sum / team.results[seasonName].length;
      }
      if (average > averageViewMaxValue) {
        setAverageViewMaxValue(average);
      }
      averagePointsAllSeasons.push(average);
    }
    return averagePointsAllSeasons;
  }

  const cumulativeLabels: string[] = generateLabelsCumulative();

  function generateDataSetsCumualtive(averagePointsMode: boolean = true): ChartDataSet[] {
    const displayedTeams = [chosenTeam].concat(Object.values(comparisonTeams));
    const chartDataSets: ChartDataSet[] = [];
    for (const currentTeam of displayedTeams) {
      if (currentTeam !== undefined) {
        let points: number[] = [];
        let teamLabel: string = '';
        if (averagePointsMode) {
          points = generateAveragePointsArray(currentTeam, cumulativeLabels);
          teamLabel = `Average points for ${currentTeam.name}.`;
        } else {
          points = generateTotalPointsArray(currentTeam, cumulativeLabels);
          teamLabel = `Cumulative points for ${currentTeam.name}.`;
        }
        const dataColor : string = currentTeam.color;

        const chartDataSet = new ChartDataSet(false, teamLabel, points, dataColor, dataColor, 1.5, 0.5);
        chartDataSets.push(chartDataSet);
      }
    }
    chartDataSets[0].borderWidth = 5.0; // Sets thicker line for the chosen team.
    return chartDataSets;
  }
  let lineChartComponent = <LineChart maxValue={10} titleContent={'Game-by-game points per season'} dataSets={generateDataSetsSeason()} labels={generateLabelsDefault(chosenTeam.results)} />;

  let teamComparisonComponent;
  let cumulativeViewButton;

  if (cumulativeView) {
    teamComparisonComponent = <TeamComparison teams={allTeams} comparisonTeamHandler={comparisonTeamHandler} />;
    cumulativeViewButton =
    <button className={styles['button-chart']} onClick={() => setAverageView(false)}>
      See cumulative points
    </button>;
    if (averageView) {
      lineChartComponent = <LineChart maxValue={averageViewMaxValue} titleContent={'Average points across seasons'} dataSets={generateDataSetsCumualtive(true)} labels={cumulativeLabels} />;
    } else {
      lineChartComponent = <LineChart maxValue={cumulativeViewMaxValue} titleContent={'Cumulative points across seasons'} dataSets={generateDataSetsCumualtive(false)} labels={cumulativeLabels} />;
      cumulativeViewButton =
      <button className={styles['button-chart']} onClick={() => setAverageView(true)}>
        See average points
      </button>;
    }
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
            {cumulativeViewButton}
            {teamComparisonComponent}
            {lineChartComponent}
        </div>
  );
};

export default TeamView;
