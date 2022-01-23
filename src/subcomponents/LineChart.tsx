import * as React from 'react';
import Chart from 'chart.js/auto';

type MyProps = {
  labels: Array<string>;
  dataSets: Object;
  maxValue: number;
  titleContent: string;
}

class LineChart extends React.Component<MyProps> {
  private myRef = React.createRef<HTMLCanvasElement>()
  private chart;

  componentDidMount () {
    this.chart = new Chart(this.myRef.current, {
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
    this.myRef = this.chart;
  }

  componentDidUpdate () { // Töötab, aga hacky ja annab konsoolis veateate. Vt ref forwarding ja tee eraldi funktsioon charti loomiseks.
    this.chart.destroy();
    this.chart = new Chart(this.myRef.current, {
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
    this.myRef = this.chart;
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

export default LineChart;
