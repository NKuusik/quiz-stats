const {parseData: parseData, getTeamResults: getTeamResults, Team: Team} = require('../scripts/readData');



const testData = '2,FakeTeam,9.5,8,,9,10,3,4,54';

test('Data is parsed properly', async () => {
  const parsedData = await parseData(testData);
  expect(parsedData.data[0]).toEqual(testData.split(','));
});

test('Instance of Team has correct name', async () => {
  const parsedData = await parseData(testData);
  const teamData = getTeamResults(parsedData.data[0]);
  const testTeam = new Team(teamData.place, teamData.name, teamData.latestSeasonScores, teamData.totalScore);
  expect(testTeam.name).toBe('FakeTeam');
});

test('Instance of Team has correct totalScore', async () => {
  const parsedData = await parseData(testData);
  const teamData = getTeamResults(parsedData.data[0]);
  const testTeam = new Team(teamData.place, teamData.name, teamData.latestSeasonScores, teamData.totalScore);
  expect(testTeam.totalScore).toBe('54');
});

test('Instance of Team has correct place', async () => {
  const parsedData = await parseData(testData);
  const teamData = getTeamResults(parsedData.data[0]);
  const testTeam = new Team(teamData.place, teamData.name, teamData.latestSeasonScores, teamData.totalScore);
  expect(testTeam.place).toBe('2');
});

test('Instance of Team has correct latestSeasonScores when value is not 0', async () => {
  const parsedData = await parseData(testData);
  const teamData = getTeamResults(parsedData.data[0]);
  const testTeam = new Team(teamData.place, teamData.name, teamData.latestSeasonScores, teamData.totalScore);
  expect(testTeam.latestSeasonScores[0]).toBe('9.5');
});

test('Instance of Team has correct latestSeasonScores when value is 0', async () => {
  const parsedData = await parseData(testData);
  const teamData = getTeamResults(parsedData.data[0]);
  const testTeam = new Team(teamData.place, teamData.name, teamData.latestSeasonScores, teamData.totalScore);
  expect(testTeam.latestSeasonScores[2]).toBe('0');
});