import React from 'react';
import renderer from 'react-test-renderer';
import LineChart from '../subcomponents/LineChart';
import DummyComponent from '../subcomponents/DummyComponent';
import Chart from 'chart.js/auto'


jest.mock('../subcomponents/LineChart', () => () => {
  console.log("I was called");
  const MockChart = '../mocks/MockChart.js'
  return <MockChart />
});


it('renders correctly', () => {
 const tree = renderer
      .create(<DummyComponent maxValue={null} titleContent={"This is a test Chart"} 
      dataSets={[4, 6]} 
      labels={["label 1", "label 2"]}></DummyComponent>)
      .toJSON();
    expect(tree).toMatchSnapshot(); 

    // Works
/** 
 *   const tree = renderer
      .create(<DummyComponent></DummyComponent>)
      .toJSON();
    expect(tree).toMatchSnapshot();
 * 
*/

  });