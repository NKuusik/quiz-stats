import React from 'react';
import Chart from 'chart.js/auto';
import styles from '../style.css';

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  createSeasonalDataSets() {
    let dataSets = [];
    for (let season of Object.keys(this.props.data[this.props.dataSetName])) {
      let singleDataSet = {
        label: `# of points in season ${season}`,
        data: this.props.data.seasons[season],
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(0, 10, 12)',
        borderWidth: 1.5,
        tension: 0.5
      }
      dataSets.push(singleDataSet);
    }
    return dataSets;
  }


  componentDidMount() {
    console.log(this.props.labels);
    let myChart = new Chart(this.myRef.current, {
      type: 'line',
      data: {
        labels: this.props.labels,
        datasets: this.createSeasonalDataSets()
      },
      options: {
          scales: {
              y: {
                  max: 10,
                  beginAtZero: true
              }
          }
      }
    });
  }


  render() {
    return(
      <>
      <div className='header'>
        <h1 className='title'>Season points for {this.props.data.name}</h1>
        <div className='links'>
          <a
            className='btn btn-gh'
          >
          </a>
        </div>
      </div>
      <canvas ref={this.myRef} width="400" height="100"></canvas>
    </>
    );

  }
}

function calculateLabels(seasonsAsObject) {
  let longestSeason = null;
  for (let seasonKey in seasonsAsObject) {
    if (longestSeason == null || seasonsAsObject[seasonKey].length > longestSeason.length) {
      longestSeason = seasonsAsObject[seasonKey];
    }
  }
  let labels = []
  for (let i = 1; i < longestSeason.length; i++) {
      labels.push(`Game #${i}`);
  }
  return labels;
}

export default LineChart;