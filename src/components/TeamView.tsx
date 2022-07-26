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

// ...View komponendid väiksemaks?
const TeamView = ({chosenTeam, seasonNames, allTeams}: MyProps) => {
  const defaultDataSetsShown : number = 3;
  const [cumulativeView, setCumulativeView] = useState(false);
  const [comparisonTeam, setComparisonTeam] = useState(undefined);
  const [cumulativeViewMaxValue, setCumulativeViewMaxValue] = useState(0)


  function comparisonTeamHandler(input) {
    setCumulativeViewMaxValue(0); // Reset this value every time setComparisonTeam changes.
    if (input === comparisonTeam) {
      setComparisonTeam(undefined);
    } else {
      setComparisonTeam(input);
    }
  }

  // Reset cumulative view, when main team is changed
  useEffect(() => {
    setComparisonTeam(undefined);
    setCumulativeViewMaxValue(0); 
  }, [chosenTeam]);


  function generateLabelsDefault(seasonsAsObject: Object): string[] {
    let longestSeason = [];
    for (const seasonKey in seasonsAsObject) {
      if (seasonsAsObject[seasonKey].length > longestSeason.length) { // Todo: parem kui saaks kasutada Season.total_games-i -> vajaks uuesti Season propsi
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

  const cumulativeLabels: string[] = generateLabelsCumulative();


  function generateDataSetsCumualtive(): ChartDataSet[] { // äkki ka average points per game view?
    let displayedTeams = [chosenTeam, comparisonTeam];
    let chartDataSets: any = []; // kitsam type def
    for (let currentTeam of displayedTeams) {
      if (currentTeam !== undefined) {
        const totalPoints: number[] = generateTotalPointsArray(currentTeam, cumulativeLabels);
        const dataColor : string = currentTeam.color; // idee: home team paksema joonega
        const teamLabel: string = `Cumulative points for ${currentTeam.name}.`;
        const chartDataSet = new ChartDataSet(false, teamLabel, totalPoints, dataColor, dataColor, 1.5, 0.5);
        chartDataSets.push(chartDataSet);
      }
    }
    return chartDataSets;
  }

  return (
        <div className={styles['team-view']}>
            <h1>Stats for team {chosenTeam.name}</h1>
            <button id={styles[visualizeActiveButton('game-by-game', cumulativeView)]} className={styles['button-chart-type']} onClick={() => setCumulativeView(false)}>
              See points per season
            </button>
            <button id={styles[visualizeActiveButton('cumulative', cumulativeView)]} className={styles['button-chart-type']} onClick={() => setCumulativeView(true)}>
              See points across seasons
            </button>

            {
            !cumulativeView
              ? 
              <LineChart maxValue={10} titleContent={'Game-by-game points per season'} dataSets={generateDataSetsSeason()} labels={generateLabelsDefault(chosenTeam.results)} />
              :
              <div>
                <TeamComparison teams={allTeams} comparisonTeamHandler={comparisonTeamHandler} /> 
                <LineChart maxValue={cumulativeViewMaxValue + 10} titleContent={'Cumulative points across seasons'} dataSets={generateDataSetsCumualtive()} labels={cumulativeLabels} />
              </div>

            }
        </div>
  );
};

export default TeamView;
