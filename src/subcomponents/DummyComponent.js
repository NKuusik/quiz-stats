import * as React from 'react';
import LineChart from './LineChart';

class DummyComponent extends React.Component {
    constructor (props) {
      super(props);
    }
  
    render () {
      return (
              <div>
                <p>
                  "I am a simple dummy component for checking snapshots."
                </p>
                <LineChart titleContent={`I am a fake chart`}/>
              </div>

  
      );
    }
  }
  
  export default DummyComponent;