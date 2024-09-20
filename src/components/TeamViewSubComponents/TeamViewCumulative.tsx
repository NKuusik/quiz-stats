import React, {useState, useEffect} from 'react';
import LineChart from '../../subcomponents/LineChart';
import {Team} from '../../classes/EntityChildren/Team';
import {ChartDataSet} from '../../classes/ChartDataSet';

type MyProps = {
  chosenTeam: Team;
  seasonNames: string[];
  allTeams : {[teamName: string]: Team};
  collapseWidth: number,
  averageView: boolean,
  comparisonTeams: {[teamName: string]: Team},
  cumulativeViewMaxValue: number,
  averageViewMaxValue: number,
  handleCumulativeViewMaxValue: Function
  handleAverageViewMaxValue: Function
}

const TeamViewCumulative = ({
  chosenTeam, seasonNames, allTeams, collapseWidth, 
  averageView, comparisonTeams, cumulativeViewMaxValue, 
  averageViewMaxValue, handleCumulativeViewMaxValue, handleAverageViewMaxValue}: MyProps) => {

  function generateLabels(): string[] {
    const labels : string[] = [];
    for (const season of seasonNames) {
      labels.push(season);
    }
    labels.sort();
    return labels;
  }

  const cumulativeLabels: string[] = generateLabels();

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
        handleCumulativeViewMaxValue(sum);
      } else if (averagePointMode && (average > averageViewMaxValue)) {
        handleAverageViewMaxValue(average);
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
    console.log("generateDataSets")
    console.log(comparisonTeams)
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

  let lineChartComponent = <LineChart 
    maxValue={averageViewMaxValue} 
    titleContent={'Average points across seasons'} 
    dataSets={generateDataSets(true)} 
    labels={cumulativeLabels} />;

  if (!averageView) {
    lineChartComponent = <LineChart 
      maxValue={cumulativeViewMaxValue} 
      titleContent={'Total points across seasons'} 
      dataSets={generateDataSets(false)} 
      labels={cumulativeLabels} />;
  }

  return (
      <span>
        {lineChartComponent}
      </span>

  );
};

export default TeamViewCumulative;
