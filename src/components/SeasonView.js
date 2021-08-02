import React, {useState} from 'react';
import LineChart from '../subcomponents/LineChart';

function SeasonView(props) {

    function calculateLabels() {
        let labels = [];
        for (let i = 1; i < props.teams[props.season.teams[0]].seasons[props.season.name].length; i++) {
            labels.push(`Game #${i}`);
        }
        return labels;
    }

    function generateDataSetsWithRunningPoints() {
        let dataSetsWithRunningPoints = [];
        for (let teamName of Object.values(props.season.teams)) {
            let singleDataSet = {
                label: `${teamName}`,
                data: props.teams[teamName].seasons[props.season.name],
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(0, 10, 12)',
                borderWidth: 1.5,
                tension: 0.5
            }
            dataSetsWithRunningPoints.push(singleDataSet);
        }
        return dataSetsWithRunningPoints;
      }
    
    function generateDataSetsWithIncrementalPoints() {
        let dataSets = [];
        for (let teamName of Object.values(props.season.teams)) {
            let incrementalPoints = [];
            for (let i = 0; i < props.teams[teamName].seasons[props.season.name].length; i++) {
                if (i == 0) {
                    incrementalPoints.push(parseInt(props.teams[teamName].seasons[props.season.name][i]));
                } else {
                    let incrementedValue = parseInt(props.teams[teamName].seasons[props.season.name][i]) + incrementalPoints[i -1];
                    incrementalPoints.push(incrementedValue);
                }
            }
            let singleDataSet = {
                label: `${teamName}`,
                data: incrementalPoints,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(0, 10, 12)',
                borderWidth: 1.5,
                tension: 0.5
            }
            dataSets.push(singleDataSet);
        }
        return dataSets;
    }

    generateDataSetsWithIncrementalPoints();
    return (
        <div>
            <LineChart titleContent={`Game-by-game points for ${props.season.name}`} dataSets={generateDataSetsWithRunningPoints()} labels={calculateLabels()}/>
            <LineChart titleContent={`Incremental points ${props.season.name}`} dataSets={generateDataSetsWithIncrementalPoints()} labels={calculateLabels()}/>
        </div>
    )
}

export default SeasonView;