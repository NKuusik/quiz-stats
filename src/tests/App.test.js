import App  from '../App';
import {Team} from '../classes/Team';
import * as rawData from '../resources/seasons';


// No snapshot of App for now. 
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
  seasonLength = app.setAndValidateSeasonLength(seasonLength, testTeam.latestSeasonScores);
  const secondTeam = new Team(1, "Second team", [2, 3], 3);
  seasonLength = app.setAndValidateSeasonLength(seasonLength, secondTeam.latestSeasonScores);
  expect(seasonLength).toBe(2);
});

test('error is thrown for incorrect seasonLength', () => {
  const app = new App(rawData);
  let seasonLength = 0;
  const testTeam = new Team(1, "Fake team", [1, 2], 3);
  seasonLength = app.setAndValidateSeasonLength(seasonLength, testTeam.latestSeasonScores);
  const secondTeam = new Team(1, "Second team", [2, 3, 4], 3);
  expect(() => 
    app.setAndValidateSeasonLength(seasonLength, 
    secondTeam.latestSeasonScores)).toThrow();
});

test('No error is thrown for valid season ranking', () => {
  const app = new App(rawData);
  const testTeam = new Team(1, "Fake team", [1, 2], 3);
  const secondTeam = new Team(2, "Second team", [2, 3], 3);
  const seasonRanking = ["Fake team", "Second team"];
  const teamsInSeason = {
    "Fake team": testTeam,
    "Second team": secondTeam
  }
  expect(() => app.validateCurrentSeasonRanking(seasonRanking, teamsInSeason)).not.toThrow();
});