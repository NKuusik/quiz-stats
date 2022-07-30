// Jest mocks go here.

import React, { Component } from 'react';
import { ProgressPlugin } from 'webpack';
import MockChart from './src/tests/__mocks__/MockChart';

let mockChart = jest.fn();

jest.mock('./src/subcomponents/LineChart', () => (props) => {
  return <MockChart titleContent={props.titleContent} 
                    dataSets={props.dataSets} 
                    labels={props.labels}
                    maxValue={props.maxValue}/>;
});

jest.mock('./src/resources/icons/icons.js', () =>{
  return "";
});