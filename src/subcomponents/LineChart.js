import React from 'react';
import Chart from 'chart.js/auto';

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  componentDidMount() {
      
    console.log(this.props.team.gameScores);
    let myChart = new Chart(this.myRef.current, {
      type: 'line',
      data: {
        labels: calculateLabels(this.props.team.gameScores.length),
          datasets: [{
              label: '# of points',
              data: this.props.team.gameScores,
              borderColor: 'rgb(75, 192, 192)',
              borderWidth: 1,
              tension: 0.5
          }]
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
        <h1 className='title'>Season points for {this.props.team.name}</h1>
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

function calculateLabels(length) {
    let labels = []
    for (let i = 1; i < length; i++) {
        labels.push(`Game #${i}`);
    }
    return labels;
}

export default LineChart;