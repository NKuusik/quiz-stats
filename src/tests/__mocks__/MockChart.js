import * as React from 'react';

class MockChart extends React.Component {
    constructor (props) {
      super(props);
    }

    render () {
      return (
        <div>
          <p>I am a mock chart.</p>
          <div className={'test-data'}>
            {this.props.dataSets.map(dataSet => (
             <p key={dataSet.label}>{dataSet.data.toString()}</p> )
            )}
          </div>
          <canvas width="400" height="150"></canvas>
        </div>
      );
    }
  }
  
export default MockChart;