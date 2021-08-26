import React from 'react';
import Chart from 'chart.js/auto';
import styles from '../style.css';

class LineChart extends React.Component {
  constructor (props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount () {
    const myChart = new Chart(this.myRef.current, {
      type: 'line',
      data: {
        labels: this.props.labels,
        datasets: this.props.dataSets
      },
      options: {
        scales: {
          y: {
            max: this.props.maxValue,
            beginAtZero: true
          }
        }
      }
    });
  }

  render () {
    return (
      <>
      <div className='header'>
        <h1 className='title'>{this.props.titleContent}</h1>
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

function calculateLabels (seasonsAsObject) {
  let longestSeason = null;
  for (const seasonKey in seasonsAsObject) {
    if (longestSeason == null || seasonsAsObject[seasonKey].length > longestSeason.length) {
      longestSeason = seasonsAsObject[seasonKey];
    }
  }
  const labels = [];
  for (let i = 1; i < longestSeason.length; i++) {
    labels.push(`Game #${i}`);
  }
  return labels;
}

export default LineChart;
