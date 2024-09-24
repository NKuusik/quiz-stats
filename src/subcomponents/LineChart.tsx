import * as React from 'react';
import Chart from 'chart.js/auto';
import * as styles from '../style.css';
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
    if (this.chart !== undefined) {
      this.chart.destroy()
    }
    this.chart = new Chart(this.myRef.current, {
      type: 'line',
      data: {
        labels: this.props.labels,
        datasets: this.props.dataSets
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            max: this.props.maxValue,
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            position: 'bottom'
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
    <div>
        <div className='header'>
          <h1 className='title'>{this.props.titleContent}</h1>
        </div>
        <div className={styles['chart-container']}>
          <canvas ref={this.myRef} ></canvas>
        </div>
    </div>
  )}
};


export default LineChart;
