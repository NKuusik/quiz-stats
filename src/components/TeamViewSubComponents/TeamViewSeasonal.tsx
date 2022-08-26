import React from 'react';
import LineChart from '../../subcomponents/LineChart';
import {Team} from '../../classes/EntityChildren/Team';
import {ChartDataSet} from '../../classes/ChartDataSet';

type MyProps = {
    chosenTeam: Team;
  }

const TeamViewSeasonal = ({chosenTeam}: MyProps) => {
  const defaultDataSetsShown : number = 3;

  function generateLabels(seasonsAsObject: Object): string[] {
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

  function generateDataSets(): ChartDataSet[] {
    const arrayWithSeasonPoints : ChartDataSet[] = [];
    for (const seasonName of Object.keys(chosenTeam.results)) {
      // const dataColor : string = chosenTeam.teamSeasons[seasonName].color; // Siin vaja taiendada Seasoni API-d
      const dataColor = '#FFFFFF';
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

  const lineChartComponent = <LineChart maxValue={10} titleContent={'Game-by-game points per season'} dataSets={generateDataSets()} labels={generateLabels(chosenTeam.results)} />;

  return (
    lineChartComponent
  );
};

export default TeamViewSeasonal;
