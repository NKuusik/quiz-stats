import App  from '../App';
import {Team} from '../classes/Team';
import * as rawData from '../resources/seasons';


// No snapshot for App. 
// Just test functionality of individual methods.


test('updateTeamData adds new Team', () => {
  const app = new App(rawData);
  let teamsState = app.state.teams;
  expect(Object.keys(teamsState).length).toBe(0);
  const testTeam = new Team(1, "Fake team", [1, 2], 3);
  const seasonName = "SeasonName";
  teamsState = app.updateTeamData(app.state.teams, testTeam, seasonName);
  expect(Object.keys(teamsState).length).toBe(1);
  expect(teamsState["Fake team"].name).toBe('Fake team');
  expect(teamsState["Random name"]).toBe(undefined);
});

