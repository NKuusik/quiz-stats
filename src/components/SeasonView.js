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
            console.log(teamName);
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


    return (
        <div>
            <p>I am a SeasonView</p>
            <p>This is season {props.season.name}</p>
            <LineChart titleContent={`Game-by-game points for ${props.season.name}`} dataSets={generateDataSetsWithRunningPoints()} labels={calculateLabels()}/>
        </div>
    )
}

export default SeasonView;