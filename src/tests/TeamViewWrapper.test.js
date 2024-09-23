/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import TeamViewWrapper from '../components/TeamViewWrapper';
import {Team} from '../classes/EntityChildren/Team';
import {render} from '@testing-library/react';
import {Season} from '../classes/EntityChildren/Season';

const testTeam = new Team("Fake team", [1, 2], 3);
const testSeason = new Season("SeasonNumber");
testTeam.results["SeasonNumber"] = [3, 4]
testTeam.teamSeasons["SeasonNumber"] = testSeason;

let testTeams = {
  "Fake team": testTeam
};

const testSeasons = {
  "SeasonNumber": testSeason
};

it('renders correctly', () => {

    const tree = renderer
         .create(<TeamViewWrapper 
          teams={testTeams} 
          seasonNames={['SeasonNumber']} 
          fadeOut={''} 
          collapseWidth={800}
          activeEntry={testTeam}
          />)
         .toJSON();
       expect(tree).toMatchSnapshot(); 
    });

test("Active team is displayed", () => {
  const element = render(<TeamViewWrapper 
    teams={testTeams} 
    seasonNames={['SeasonNumber']} 
    fadeOut={''} 
    collapseWidth={800}
    activeEntry={testTeam}
    />);

  expect(element.getByRole('heading')).toHaveTextContent('Stats for team Fake team');
});  
