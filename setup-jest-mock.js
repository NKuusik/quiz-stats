// Jest mocks go here.

import React, { Component } from 'react';


jest.mock('./src/subcomponents/LineChart', () => () => {
  return '<MockChart />';

  /**
   * Just in case, previous mock implementation:
   *  const MockChart = './src/tests/mocks/MockChart.js'
      return <MockChart />
   */
});