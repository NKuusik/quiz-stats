/*

import React, { Component } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


jest.mock('chart.js', () => ({
    Line: () => new Chart(null, {
      type: 'line',
      data: {
        labels: this.props.labels,
        datasets: this.props.dataSets
      },
      options: {
        scales: {
          y: {
            max: this.props.maxValue,
            beginAtZero: true
          }
        }
      }
    })
  
  }));
*/