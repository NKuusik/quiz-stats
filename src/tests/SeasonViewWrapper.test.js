/**
 * @jest-environment jsdom
 */

import React from 'react';
import SeasonViewWrapper from '../components/SeasonViewWrapper';
import { Team } from '../classes/EntityChildren/Team';
import { Season } from '../classes/EntityChildren/Season';
import {render, fireEvent } from '@testing-library/react';

const testTeam = new Team("Fake team", [1, 2], 3);
testTeam.results["Test Season"] = [3, 4]

let testTeams = {
  "Fake team": testTeam
};

const testSeason = new Season("Test Season", testTeams, 0, ["Fake team"]);

const testSeasons = {
    "Test Season": testSeason
}

it('default renders correctly', () => {

    const tree = render(<SeasonViewWrapper 
          seasons={testSeasons}
          fadeOut=''
          activeEntry={testSeason}
          />);
       expect(tree).toMatchSnapshot(); 
    });