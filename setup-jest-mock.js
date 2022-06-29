// Jest mocks go here.

import React, { Component } from 'react';


jest.mock('./src/subcomponents/LineChart', () => () => {
  return '<MockChart />';
});

jest.mock('./src/App', () => () => {
   return '<MockApp />';
});