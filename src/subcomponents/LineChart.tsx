import * as React from 'react';
import Chart from 'chart.js/auto';
Chart.defaults.color = '#DCDEE6';

type MyProps = {
  labels: Array<string>;
  dataSets: object;
  maxValue: number;
  titleContent: string;
}

class LineChart extends React.Component<MyProps> {
  private myRef = React.createRef<HTMLCanvasElement>()
  private chart;

  componentDidMount() {
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
        },
        plugins: {
          legend: {
            position: 'right'
          }
        }
      }
    });
  }

  componentDidUpdate() {
    this.chart.config.data.datasets = this.props.dataSets;
    this.chart.config.data.labels = this.props.labels;
    this.chart.config.options.scales.y.max = this.props.maxValue;
    this.chart.update();
  }

  render() {
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
      <canvas ref={this.myRef} width="400" height="150"></canvas>
    </>
    );
  }
}

export default LineChart;
