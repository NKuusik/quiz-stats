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

test('updateTeamData modifies data of existing Team', () => {
  const app = new App(rawData);
  let teamsState = app.state.teams;
  expect(Object.keys(teamsState).length).toBe(0);
  const testTeam = new Team(1, "Fake team", [1, 2], 3);
  const seasonName = "SeasonName";
  teamsState = app.updateTeamData(app.state.teams, testTeam, seasonName);
  expect(Object.keys(teamsState).length).toBe(1);
  expect(teamsState["Fake team"].name).toBe('Fake team');
  expect(teamsState["Random name"]).toBe(undefined);
  testTeam.latestSeasonScores = [3, 4];
  const secondSeason = "SecondSeason";
  teamsState = app.updateTeamData(app.state.teams, testTeam, secondSeason);
  expect(teamsState["Fake team"].seasons["SecondSeason"]).toStrictEqual([3, 4]);
});

test('seasonLength is initially set', () => {
  const app = new App(rawData);
  let seasonLength = 0;
  const testTeam = new Team(1, "Fake team", [1, 2], 3);
  seasonLength = app.setAndValidateSeasonLength(0, testTeam.latestSeasonScores);
  expect(seasonLength).toBe(2);
});

test('correct seasonLength is validated', () => {
  const app = new App(rawData);
  let seasonLength = 0;
  const testTeam = new Team(1, "Fake team", [1, 2], 3);
  seasonLength = app.setAndValidateSeasonLength(0, testTeam.latestSeasonScores);
  const secondTeam = new Team(1, "Second team", [2, 3], 3);
  seasonLength = app.setAndValidateSeasonLength(0, secondTeam.latestSeasonScores);
  expect(seasonLength).toBe(2);
});

