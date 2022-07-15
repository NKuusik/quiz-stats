

import { Team } from '../classes/EntityChildren/Team';
import { Entity } from '../classes/Entity';

const {parseData: parseData} = require('../scripts/readData');

const testData = '2,FakeTeam,9.5,8,,9,10,3,4,54';

/* Ei tööta kuna pärandatud atribuut */

test('Instance of Team has correct name', async () => {
    const parsedData = await parseData(testData);
    const rawData = parsedData.data[0];
    let testTeam = new Team(rawData[1], rawData.slice(2, -1), rawData[rawData.length - 1]);
    expect(testTeam.name).toBe('FakeTeam');
  });

  test('Instance of Team has correct totalScore', async () => {
    const parsedData = await parseData(testData);
    const rawData = parsedData.data[0];    
    let testTeam = new Team(rawData[1], rawData.slice(2, -1), parseInt(rawData[rawData.length - 1]));
    expect(testTeam.totalScore).toBe(54);
  });
  
  test('Instance of Team has correct latestSeasonScores when value is not 0', async () => {
    const parsedData = await parseData(testData);
    const rawData = parsedData.data[0];    
    let testTeam = new Team(rawData[1], rawData.slice(2, -1), rawData[rawData.length - 1]);
    expect(testTeam.latestSeasonScores[0]).toBe('9.5');
  });
  
  test('Instance of Team has correct latestSeasonScores when value is 0', async () => {
    const parsedData = await parseData(testData);
    const rawData = parsedData.data[0];    
    let testTeam = new Team(rawData[1], rawData.slice(2, -1), rawData[rawData.length - 1]);
    expect(testTeam.latestSeasonScores[2]).toBe('0');
  });