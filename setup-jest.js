import React, { Component } from 'react';

jest.mock('chart.js', () => ({
    Line: () => null
  }));