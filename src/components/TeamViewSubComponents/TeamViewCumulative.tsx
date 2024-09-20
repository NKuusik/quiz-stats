import React from 'react';
import LineChart from '../../subcomponents/LineChart';
import {Team} from '../../classes/EntityChildren/Team';
import {ChartDataSet} from '../../classes/ChartDataSet';

type MyProps = {
  chosenTeam: Team;
  seasonNames: string[];
  isAveragePointsView: boolean,
  comparisonTeams: {[teamName: string]: Team},
  cumulativeViewMaxValue: number,
  averagePointsViewMaxValue: number,
  generatePointsArray: Function
}

const TeamViewCumulative = ({
  chosenTeam, 
  seasonNames,
  isAveragePointsView, 
  comparisonTeams, 
  cumulativeViewMaxValue,
  averagePointsViewMaxValue, 
  generatePointsArray}: MyProps) => {

  function generateLabels(): string[] {
    const labels : string[] = [];
    for (const season of seasonNames) {
      labels.push(season);
    }
    labels.sort();
    return labels;
  }

  const cumulativeLabels: string[] = generateLabels();

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

  let lineChartComponent = <LineChart 
    maxValue={averagePointsViewMaxValue} 
    titleContent={'Average points across seasons'} 
    dataSets={generateDataSets(true)} 
    labels={cumulativeLabels} />;

  if (!isAveragePointsView) {
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
