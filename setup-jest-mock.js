// Jest mocks go here.

import React, { Component } from 'react';


jest.mock('./src/subcomponents/LineChart', () => () => {
  const MockChart = './src/tests/mocks/MockChart.js'
  return <MockChart />
});