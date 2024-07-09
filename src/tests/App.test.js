/**
 * @jest-environment jsdom
 */

jest.mock('axios');
import axios from 'axios';
import React from 'react';
import renderer from 'react-test-renderer';
import App  from '../App';
import {render, fireEvent, waitFor} from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import {expect, jest, test} from '@jest/globals';

  describe('App', () =>{
    beforeEach(() => {
      fetchMock.resetMocks()
    })

    let localTestData = {
      testSeason1: [
        [ '01' ],
        [ '1', 'First Test Team', '10', '5', '3', '18' ],
        [ '2', 'Second Test Team', '4', '6', '2', '12' ],
        [ '3', 'Third Test Team', '1', '1', '9', '9' ]
      ]
    }

    test('all teams are added correctly', async () => {


      // Todo: expand this
      axios.get
        .mockResolvedValueOnce({ data: '01\n1,First Test Team,10,5,3,18\n'});

      const app = await render(<App 
        rawData={localTestData}
        collapseWidth={800}
        />);
      
      await waitFor(() =>
      {    
        let teamButton = app.container.querySelectorAll('button')[0];
        fireEvent.click(teamButton);  
        const entriesAsDOM = app.container.getElementsByClassName('entry-selection');
        expect(entriesAsDOM.length).toBe(1);
        expect(entriesAsDOM[0].textContent).toBe('First Test Team');

      })
    });
    
    it('default renders correctly', () => {
      const tree = renderer
          .create(<App 
            rawData={localTestData}
            collapseWidth={800}
            />)
          .toJSON();
        expect(tree).toMatchSnapshot(); 
      });    
  })

/*
test('updateTeamData adds new Team', () => {
  const app = new App(rawData, 800);

  let teamsState = app.teams;
  console.log(teamsState)
  expect(true).toBe(true);


  expect(Object.keys(teamsState).length).toBe(0);
  const seasonName = "SeasonName";
  const teamRanking = 1;
  const currentTeamName = "Fake team";
  const teamLatestSeasonScores = [1, 2];
  const teamTotalScore = 3;
  teamsState = app.updateTeamData(app.teams, teamRanking, currentTeamName, 
    teamLatestSeasonScores, teamTotalScore, seasonName);
  expect(Object.keys(teamsState).length).toBe(1);
  expect(teamsState["Fake team"].name).toBe('Fake team');
  expect(teamsState["Random name"]).toBe(undefined);
});
*/
/*
test('updateTeamData modifies data of existing Team', () => {
  const app = new App(rawData);
  let teamsState = app.state.teams;
  expect(Object.keys(teamsState).length).toBe(0);
  const seasonName = "SeasonName";
  const teamRanking = 1;
  const currentTeamName = "Fake team";
  const teamLatestSeasonScores = [1, 2];
  const teamTotalScore = 3;
  teamsState = app.updateTeamData(app.state.teams, teamRanking, currentTeamName, 
    teamLatestSeasonScores, teamTotalScore, seasonName);
  expect(Object.keys(teamsState).length).toBe(1);
  expect(teamsState["Fake team"].name).toBe('Fake team');
  expect(teamsState["Random name"]).toBe(undefined);
  let secondSeasonScores = [3, 4];
  let secondSeasonRanking = 5;
  let secondSeasonTotalScore = 7;
  const secondSeason = "SecondSeason";
  teamsState = app.updateTeamData(app.state.teams, secondSeasonRanking, currentTeamName, secondSeasonScores, secondSeasonTotalScore, secondSeason);
  expect(teamsState["Fake team"].results["SecondSeason"]).toStrictEqual([3, 4]);
});

test('seasonLength is initially set', () => {
  const app = new App(rawData);
  let seasonLength = 0;
  const testTeam = new Team("Fake team", [1, 2], 3);
  seasonLength = app.setAndValidateSeasonLength(0, testTeam.latestSeasonScores);
  expect(seasonLength).toBe(2);
});

test('correct seasonLength is validated', () => {
  const app = new App(rawData);
  let seasonLength = 0;
  const testTeam = new Team("Fake team", [1, 2], 3);
  seasonLength = app.setAndValidateSeasonLength(seasonLength, testTeam.latestSeasonScores);
  const secondTeam = new Team("Second team", [2, 3], 3);
  seasonLength = app.setAndValidateSeasonLength(seasonLength, secondTeam.latestSeasonScores);
  expect(seasonLength).toBe(2);
});

test('error is thrown for incorrect seasonLength', () => {
  const app = new App(rawData);
  let seasonLength = 0;
  const testTeam = new Team("Fake team", [1, 2], 3);
  seasonLength = app.setAndValidateSeasonLength(seasonLength, testTeam.latestSeasonScores);
  const secondTeam = new Team("Second team", [2, 3, 4], 3);
  expect(() => 
    app.setAndValidateSeasonLength(seasonLength, 
    secondTeam.latestSeasonScores)).toThrow();
});

test('No error is thrown for valid season ranking', () => {
  const app = new App(rawData);
  const currentSeasonName = "TestSeason"
  app.updateTeamData(app.state.teams, 1, "Fake team", [1, 2], 3, currentSeasonName);
  app.updateTeamData(app.state.teams, 2, "Second team", [2, 0], 2, currentSeasonName);
  const currentSeasonRanking = ["Fake team", "Second team"];
  const teamsInSeason = ["Second team", "Fake team"];
  expect(() => app.validateCurrentSeasonRanking(currentSeasonName, currentSeasonRanking, teamsInSeason)).not.toThrow();
});

test('Error is thrown due to a mismatch between the length of seasonRanking and teams in season', 
  () => {
    const app = new App(rawData);
    const currentSeasonName = "TestSeason"
    app.updateTeamData(app.state.teams, 1, "Fake team", [1, 2], 3, currentSeasonName);
    app.updateTeamData(app.state.teams, 2, "Second team", [2, 0], 2, currentSeasonName);
    const seasonRanking = ["Fake team", "Second team", "Third team"];
    const teamsInSeason = ["Second team", "Fake team"];
    expect(() => app.validateCurrentSeasonRanking(currentSeasonName, seasonRanking, teamsInSeason))
    .toThrow('The number of teams in season rankings does not match ' 
    + 'with the actual number of teams');
  });

  test('Error is thrown due to a team being present in season but not in seasonRanking', 
  () => {
    const app = new App(rawData);
    const currentSeasonName = "TestSeason"
    app.updateTeamData(app.state.teams, 1, "Fake team", [1, 2], 3, currentSeasonName);
    app.updateTeamData(app.state.teams, 2, "Second team", [2, 0], 2, currentSeasonName);
    const seasonRanking = ["Second team"];
    const teamsInSeason = ["Fake team"];
    expect(() => app.validateCurrentSeasonRanking(currentSeasonName, seasonRanking, teamsInSeason))
    .toThrow(`Fake team is not in place 1`);
  });


  /** // 
   * 
   * vt https://stackoverflow.com/questions/42773502/async-component-snapshot-using-jest-and-redux
   * 
   * it('renders correctly', () => {
    const tree = renderer
    .create(<App rawData={rawData} />)
    .toJSON();
  expect(tree).toMatchSnapshot(); 
  });

   */
  