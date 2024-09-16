/**
 * @jest-environment jsdom
 */
jest.mock('axios');
import axios from 'axios';
import React from 'react';
import renderer from 'react-test-renderer';
import App  from '../App';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import {expect, jest, test} from '@jest/globals';

  describe('App', () =>{
    beforeEach(() => {
      fetchMock.resetMocks();
      global.innerWidth = 1024
    })

    function arrayToStringMock(outerArray) {
      let output = outerArray[0][0];
      for (let row of outerArray.slice(1)) {
        let rowAsString = row.toString()
        output = output.concat("\n", rowAsString)
      }
      return output
    }


    let localTestData = {
      'testSeason1': [
        [ '01' ],
        [ '1', 'First Test Team', '10', '5', '3', '18' ],
        [ '2', 'Second Test Team', '4', '6', '2', '12' ],
        [ '3', 'Third Test Team', '1', '1', '9', '9' ],
        ['']
      ]
    }



    test('all teams are added correctly', async () => {

      axios.get
        .mockResolvedValueOnce({ data: arrayToStringMock(localTestData['testSeason1'])});

      const app = await render(<App 
        rawData={localTestData}
        collapseWidth={800}
        />);
      
      await waitFor(() =>
      {    
        let teamButton = app.container.querySelectorAll('button')[0];
        let entriesAsDOM = app.container.getElementsByClassName('entry-selection');
        fireEvent.click(teamButton);  

        expect(entriesAsDOM.length).toBe(3);
        expect(entriesAsDOM[0].textContent).toBe('First Test Team');
        expect(entriesAsDOM[1].textContent).toBe('Second Test Team');
        expect(entriesAsDOM[2].textContent).toBe('Third Test Team');
      })
    });

    test('season is added correctly', async () => {


      axios.get
        .mockResolvedValueOnce({ data: arrayToStringMock(localTestData['testSeason1'])});

      const app = await render(<App 
        rawData={localTestData}
        collapseWidth={800}
        />);
      
      await waitFor(() =>
      {    
        let seasonButton = app.container.querySelectorAll('button')[1];
        let entriesAsDOM = app.container.getElementsByClassName('entry-selection');
        fireEvent.click(seasonButton);  

        expect(entriesAsDOM.length).toBe(1);
        expect(entriesAsDOM[0].textContent).toBe('season 01');
      })
    });

    test('entry can be chosen and toggled from the menu bar', async () => {

      axios.get
        .mockResolvedValueOnce({ data: arrayToStringMock(localTestData['testSeason1'])});
  
      const app = await render(<App 
        rawData={localTestData}
        collapseWidth={800}
        />);
      

      // Pressing the team button displays stats view for that team.
      await waitFor(() =>
      {  
        let teamButton = app.container.querySelectorAll('button')[0];
        fireEvent.click(teamButton);  
        let entriesAsDOM = app.container.getElementsByClassName('entry-selection');
        let firstTestTeamButton = entriesAsDOM[0]
        fireEvent.click(firstTestTeamButton)
      })


      let teamViewAsDom = app.container.getElementsByClassName('team-view');
      expect(teamViewAsDom.length).toBe(1);
      expect(screen.getByText('Stats for team First Test Team')).toBeInTheDocument();

      // Pressing the team button again toggles the stats view off.
      await waitFor(() =>
        {  
          let entriesAsDOM = app.container.getElementsByClassName('entry-selection');
          let firstTestTeamButton = entriesAsDOM[0]
          fireEvent.click(firstTestTeamButton)
        })

        teamViewAsDom = app.container.getElementsByClassName('team-view');
        expect(teamViewAsDom.length).toBe(0);
    });

    test('resizing the screen changes the layout', async () => {

      axios.get
        .mockResolvedValueOnce({ data: arrayToStringMock(localTestData['testSeason1'])});
  
      const app = await render(<App 
        rawData={localTestData}
        collapseWidth={800}
        />);
      

      let wrapperWithExtendedLayout = app.container.getElementsByClassName('app-wrapper-extended');
      expect(wrapperWithExtendedLayout.length).toBe(0);

      // Resizing the window changes the layout
      await waitFor(() =>
      {  
        global.innerWidth = 500;
        global.dispatchEvent(new Event('resize'));
      })

      expect(wrapperWithExtendedLayout.length).toBe(1);

      // Choosing an entry from the menubar collapses the layout
      await waitFor(() =>
        {  
          let teamButton = app.container.querySelectorAll('button')[0];
          fireEvent.click(teamButton);  
          let entriesAsDOM = app.container.getElementsByClassName('entry-selection');
          let firstTestTeamButton = entriesAsDOM[0]
          fireEvent.click(firstTestTeamButton)
        })

        expect(wrapperWithExtendedLayout.length).toBe(0);

        let wrapperWithCollapsedLayout = app.container.getElementsByClassName('app-wrapper-collapsed');
        expect(wrapperWithCollapsedLayout.length).toBe(1);

      // Collapsed view is retained when resized to normal size and back
      await waitFor(() =>
        {  
          global.innerWidth = 1024;
          global.dispatchEvent(new Event('resize'));
        })

        let wrapperWithRegularLayout = app.container.getElementsByClassName('app-wrapper');
        expect(wrapperWithRegularLayout.length).toBe(1);
        expect(wrapperWithCollapsedLayout.length).toBe(0);

      await waitFor(() =>
          {  
            global.innerWidth = 500;
            global.dispatchEvent(new Event('resize'));
          })
        
      expect(wrapperWithCollapsedLayout.length).toBe(1);
      
      // Clicking on a category button during collapsed view returns to the extended layout
      await waitFor(() =>
        {  
          let seasonButton = app.container.querySelectorAll('button')[1];
          fireEvent.click(seasonButton);  
        })

        let entriesAsDOM = app.container.getElementsByClassName('entry-selection');
        expect(entriesAsDOM.length).toBe(1);
        expect(entriesAsDOM[0].textContent).toBe('season 01');
        expect(wrapperWithExtendedLayout.length).toBe(1);
        expect(wrapperWithCollapsedLayout.length).toBe(0);

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