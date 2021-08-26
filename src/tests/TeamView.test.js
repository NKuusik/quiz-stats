import React from 'react';
import renderer from 'react-test-renderer';
import TeamView from '../components/TeamView';
import { parseData, getTeamResults, Team } from '../scripts/readData';

const testData = '2,FakeTeam,9.5,8,,9,10,3,4,54';

it('renders correctly', async () => {
  const parsedData = await parseData(testData);
  const teamData = getTeamResults(parsedData.data[0]);
  const testTeam = new Team(teamData.place, teamData.name, teamData.gameScores, teamData.totalScore);
  const tree = renderer
    .create(<TeamView team={testTeam}></TeamView>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
