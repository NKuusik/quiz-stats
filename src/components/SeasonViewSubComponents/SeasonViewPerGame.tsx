import React from 'react';
import LineChart from '../../subcomponents/LineChart';
import {Season} from '../../classes/EntityChildren/Season';
import {ChartDataSet} from '../../classes/ChartDataSet';

type MyProps = {
  season : Season;
  defaultDataSetsShown : number;
  labels: string[];
  isDataSetHidden: Function;
}

const SeasonViewPerGame = ({season, defaultDataSetsShown, labels, isDataSetHidden}: MyProps) => {
  function generateDataSetsWithRunningPoints(): ChartDataSet[] {
    const dataSetsWithRunningPoints : ChartDataSet[] = [];
    let dataSetCount : number = 0;
    let isHidden : boolean = false;
    for (const teamName of season.ranking) {
      dataSetCount++;
      isHidden = isDataSetHidden(dataSetCount, defaultDataSetsShown);
      const dataColor : string = season.teams[teamName].color;
      const teamPoints: number[] = season.teams[teamName].results[season.name];
      const label = `${teamName}`;
      const chartDataSet = new ChartDataSet(isHidden, label, teamPoints, dataColor, dataColor, 1.5, 0.5);
      dataSetsWithRunningPoints.push(chartDataSet);
    }
    return dataSetsWithRunningPoints;
  }

  return (
    <LineChart titleContent={`Game-by-game points for ${season.name}`} dataSets={generateDataSetsWithRunningPoints()} labels={labels} maxValue={10}/>
  );
};

export default SeasonViewPerGame;
