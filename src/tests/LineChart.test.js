import React from 'react';
import renderer from 'react-test-renderer';
import LineChart from '../subcomponents/LineChart';


it('renders correctly', () => {
    const tree = renderer
      .create(<LineChart maxValue={10} titleContent={"This is a test Chart"} 
      dataSets={[4, 6]} 
      labels={["label 1", "label 2"]}></LineChart>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });