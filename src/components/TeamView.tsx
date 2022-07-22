import React, {useState} from 'react';
import LineChart from '../subcomponents/LineChart';
import styles from '../style.css';
import {Team} from '../classes/EntityChildren/Team';
import {ChartDataSet} from '../classes/ChartDataSet';
import {visualizeActiveButton} from '../scripts/visualizeActiveButton';

type MyProps = {
  team: Team;
  seasonNames: string[]
}

const TeamView = ({team, seasonNames}: MyProps) => {
  const defaultDataSetsShown : number = 3;
  const [cumulativeView, setCumulativeView] = useState(false);

  function generateLabelsSeason(seasonsAsObject: Object): string[] {
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
    let count : number = 0;
    for (const seasonName of Object.keys(team.results)) {
      count++;
      const dataColor : string = team.teamSeasons[seasonName].color;
      const label = `# of points in ${seasonName}`;
      const chartDataSet = new ChartDataSet(false, label, team.results[seasonName], dataColor, dataColor, 1.5, 0.5);
      arrayWithSeasonPoints.push(chartDataSet);
      arrayWithSeasonPoints.sort((a, b) => (a.label > b.label) ? 1 : -1);
      if (count > defaultDataSetsShown) {
        arrayWithSeasonPoints[count - 1].hidden = true;
      }
    }
    return arrayWithSeasonPoints;
  }

  function generateTotalPointsArray(labels: string[]): number[] {
    const totalPointsAllSeasons : number[] = [];
    for (const seasonName of labels) {
      let sum: number = 0;
      if (team.results[seasonName] !== undefined) {
        const pointsAsNumbers = team.results[seasonName].map(Number);
        sum = pointsAsNumbers.reduce((a: number, b: number) => a + b, 0);
      }
      totalPointsAllSeasons.push(sum);
    }
    return totalPointsAllSeasons;
  }

  const cumulativeLabels: string[] = generateLabelsCumulative();
  const totalPoints: number[] = generateTotalPointsArray(cumulativeLabels);

  function generateDataSetsCumualtive(): ChartDataSet[] { // Todo: võiks saada siin ja mujal võrrelda erinevaid tiime.
    const dataColor : string = team.color;
    const label: string = `Cumulative points for ${team.name}.`;
    const chartDataSet = new ChartDataSet(false, label, totalPoints, dataColor, dataColor, 1.5, 0.5);
    return [chartDataSet];
  }



  return (
        <div className={styles['team-view']}>
            <h1>Stats for team {team.name}</h1>
            <button id={styles[visualizeActiveButton('game-by-game', cumulativeView)]} className={styles['button-chart-type']} onClick={() => setCumulativeView(false)}>
              See points per season
            </button>
            <button id={styles[visualizeActiveButton('cumulative', cumulativeView)]} className={styles['button-chart-type']} onClick={() => setCumulativeView(true)}>
              See points across seasons
            </button>

            {
            !cumulativeView
              ? <LineChart maxValue={10} titleContent={'Game-by-game points per season'} dataSets={generateDataSetsSeason()} labels={generateLabelsSeason(team.results)} />
              : <LineChart maxValue={Math.max.apply(null, totalPoints) + 10} titleContent={'Cumulative points across seasons'} dataSets={generateDataSetsCumualtive()} labels={cumulativeLabels} />
            }
        </div>
  );
};

export default TeamView;
