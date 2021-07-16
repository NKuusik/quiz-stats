import React from 'react';
import { Line } from 'react-chartjs-2';



  

  
function LineChart(props) {
    const data = {
        labels: calculateLabels(props.team.gameScores.length),
        datasets: [
            {
                label: '# of Points',
                data: props.team.gameScores,
                fill: true,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.2
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [{
                    ticks: {
                        min: 0,
                        max: 10
                }
            }]
        }
    };
    return (
    <>
    <div className='header'>
      <h1 className='title'>{props.team.name}</h1>
    </div>
    <Line data={data} options={options} />
    </>
    );
}

function calculateLabels(length) {
    let labels = []
    for (let i = 1; i < length; i++) {
        labels.push(`Game #${i}`);
    }
    return labels;
}
  
export default LineChart;