const sum = require('../App');
import React from 'react';
import renderer from 'react-test-renderer';
import stats from '../resources/1-2.season.csv';
import axios from 'axios';
import {parseData, getTeamResults, Team} from '../scripts/readData.js'
import TeamView from '../components/TeamView';

test('alwaysTrue', () => {
    expect(true).toBe(true);
  });