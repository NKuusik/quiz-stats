import * as React from 'react';
import LineChart from './LineChart';

class DummyComponent extends React.Component {
  render () {
    return (
              <div>
                <p>
                I am a simple dummy component for checking snapshots.
                </p>
                 <LineChart labels={[]} dataSets={{}} maxValue={0} titleContent={'I am a fake chart'}/>
              </div>
    );
  }
}

export default DummyComponent;
