import React from 'react';
import LineChart from '../../subcomponents/LineChart';
import {Season} from '../../classes/EntityChildren/Season';
import {ChartDataSet} from '../../classes/ChartDataSet';

type MyProps = {
  season : Season;
  defaultDataSetsShown : number;
  labels: string[];
  isDataSetHidden: (currentCount: number, defaultDataSetsShown: number) => boolean;
}

const SeasonViewCumulative = ({season, defaultDataSetsShown, labels}: MyProps) => {
  let totalMaxPoints = 0;

  function isDataSetHidden(currentCount: number, defaultDataSetsShown: number): boolean {
    if (currentCount > defaultDataSetsShown) {
      return true;
    }
    return false;
  }

  function calculateIncrementalPoints(teamName: string, isHidden: boolean): ChartDataSet {
    const dataColor : string = season.teams[teamName].color;
    const incrementalPoints : number[] = [];
    const teamPoints: string[] = season.teams[teamName].results[season.name];
    for (let i = 0; i < teamPoints.length; i++) {
      if (i === 0) {
        incrementalPoints.push(parseFloat(teamPoints[i]));
      } else {
        const incrementedValue = parseFloat(teamPoints[i]) + incrementalPoints[i - 1];
        incrementalPoints.push(incrementedValue);
      }
    }
    const currentMaxPoints = incrementalPoints[incrementalPoints.length - 1];

    if (currentMaxPoints > totalMaxPoints) {
      totalMaxPoints = currentMaxPoints;
    }

    const label = `${teamName}`;
    const chartDataSet = new ChartDataSet(isHidden, label, incrementalPoints, dataColor, dataColor, 1.5, 0.5);
    return chartDataSet;
  }

  function generateDataSetsWithIncrementalPoints(): ChartDataSet[] {
    let dataSetCount : number = 0;
    let isHidden : boolean = false;
    const dataSets : ChartDataSet[] = [];
    for (const teamName of season.ranking) {
      dataSetCount++;
      isHidden = isDataSetHidden(dataSetCount, defaultDataSetsShown);
      const chartDataSet = calculateIncrementalPoints(teamName, isHidden);
      dataSets.push(chartDataSet);
    }
    return dataSets;
  }

  return (
    <LineChart titleContent={`Incremental points ${season.name}`} dataSets={generateDataSetsWithIncrementalPoints()} labels={labels} maxValue={totalMaxPoints + 10}/>
  );
};

export default SeasonViewCumulative;
