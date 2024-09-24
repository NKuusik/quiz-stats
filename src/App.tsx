import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import {parseData} from './scripts/readData';
import {Team} from './classes/EntityChildren/Team';
import {Season} from './classes/EntityChildren/Season';
import TeamViewWrapper from './components/TeamViewWrapper';
import SeasonViewWrapper from './components/SeasonViewWrapper';
import Header from './components/Header';
import {Transition} from 'react-transition-group';
import Grid from '@mui/material/Grid2'
import { Box } from '@mui/material';
import MenuBar from './components/MenuBar';

type MyProps = {
  rawData: object;
  collapseWidth: number;
}

const App = ({rawData, collapseWidth}: MyProps) => {

  const generalGridSizeNoMenu: [{[key: string]: number}, {[key: string]: number|string}] = [{xs: 0, md: 0}, {xs: 12, md: 12}]
  const generalGridSizeRegular: [{[key: string]: number}, {[key: string]: number|string}] = [{xs: 12, md: 3}, {xs: 0, md: "grow"}]
  const entryGridSize: [{[key: string]: number}, {[key: string]: number|string}] = [{xs: 0, md: 3}, {xs: 12, md: "grow"}]
  const [collapseMenuBar, setCollapseMenuBar] = useState<boolean>(false);
  const [teams, setTeams] = useState<{[teamName: string]: Team}>({});
  const [seasons, setSeasons] = useState<{[seasonName: string]: Season}>({});
  const [activeView, setActiveView] = useState<string>('');
  const [activeGridSize, setActiveGridSize] = useState<[{[key: string]: number}, {[key: string]: number|string}]>(generalGridSizeNoMenu);
  const [viewTransition, setViewTransition] = useState<boolean>(false);
  const [activeEntry, setActiveEntry] = useState<Season | Team | null>(null);
  const nodeRef = useRef(null);


  function updateTeamData(allTeams: {[teamName: string]: Team}, teamRanking: number, currentTeamName: string,
    teamLatestSeasonScores: string[],
    teamTotalScore: number, currentSeasonName: string):
    {[teamName: string]: Team} {
    if (!(currentTeamName in allTeams)) {
      allTeams[currentTeamName] = new Team(currentTeamName, teamLatestSeasonScores, teamTotalScore);
    }
    allTeams[currentTeamName].normalizeGameScore(teamLatestSeasonScores, currentSeasonName);
    allTeams[currentTeamName].rankings[currentSeasonName] = teamRanking;
    return allTeams;
  }

  function setAndValidateSeasonLength(currentSeasonLength: number,
    latestSeasonScores: string[]): number {
    if (currentSeasonLength === 0) {
      currentSeasonLength = latestSeasonScores.length;
    } else if (currentSeasonLength !== latestSeasonScores.length) {
      throw new Error('Invalid team data: season length has already been determined, but does not match with the provided length');
    }
    return currentSeasonLength;
  }

  function validateCurrentSeasonRanking(currentSeasonName: string, currentSeasonRanking: string[],
    currentSeasonTeams: string[], allTeams: {[teamName: string]: Team}) {
    if (currentSeasonRanking.length !== currentSeasonTeams.length) {
      throw new Error('The number of teams in season rankings does not match ' +
        'with the actual number of teams');
    }
    for (const teamName of currentSeasonTeams) {
      if (currentSeasonRanking[allTeams[teamName].rankings[currentSeasonName] - 1] !== teamName) {
        throw new Error(`${teamName} is not in place ${allTeams[teamName].rankings[currentSeasonName]}.
          Found ${currentSeasonRanking[allTeams[teamName].rankings[currentSeasonName] - 1]} instead.`);
      }
    }
  }

  useEffect(() => {
    const eventHandler = () => checkMenuBarCollapse();
    window.addEventListener('resize', eventHandler);
    return () => window.removeEventListener('resize', eventHandler);
  });
  useEffect(() => {
    const parsedSeasons: {[seasonName: string]: Season} = {};
    let allTeams: {[teamName: string]: Team} = {};
    for (const season of Object.values(rawData)) {
      
      axios.get(season)
        .then((res: { data: string; }) => { // Mõtle, kas kogu see eraldi mooduliks
          return parseData(res.data);
        })
        .then((parsedData: { data: string[]; }) => {
          const currentSeasonName: string = `season ${parsedData.data[0]}`;
          const currentSeasonTeamNames: string[] = [];
          const currentSeason = new Season(currentSeasonName);

          for (let i = 1; i < parsedData.data.length - 1; i++) {
            const rawTeamData: string[] = parsedData.data[i] as unknown as string[];
            const teamRanking: number = parseInt(rawTeamData[0]);
            const teamName: string = rawTeamData[1];
            const teamLatestSeasonScores: string[] = rawTeamData.slice(2, -1);
            const teamTotalScore: number = parseFloat(rawTeamData[rawTeamData.length - 1]);
            allTeams = updateTeamData(allTeams, teamRanking,
              teamName, teamLatestSeasonScores, teamTotalScore, currentSeasonName);

            currentSeason.totalGames = setAndValidateSeasonLength(currentSeason.totalGames, allTeams[teamName].results[currentSeasonName]);
            currentSeasonTeamNames.push(teamName);
            currentSeason.ranking[allTeams[teamName].rankings[currentSeasonName] - 1] = teamName;
          }

          validateCurrentSeasonRanking(currentSeasonName, currentSeason.ranking, currentSeasonTeamNames, allTeams);

          // Add current season to team data
          for (const teamName of currentSeasonTeamNames) {
            currentSeason.teams[teamName] = allTeams[teamName];
            allTeams[teamName].teamSeasons[currentSeasonName] = currentSeason;
          }

          parsedSeasons[currentSeasonName] = currentSeason;
        });
      setTeams(allTeams);
    }
    setSeasons(parsedSeasons);
  }, []);

  function chooseEntry(entryName: string, data: {[key: string]: Season} | {[key: string]: Team}): void {
    if (activeEntry === data[entryName]) {
      setActiveEntry(null);
      setActiveGridSize(generalGridSizeRegular)
    } else {
      setActiveEntry(data[entryName]);
      setActiveGridSize(entryGridSize)
      checkMenuBarCollapse()
    }
  }

  function chooseView(chosenView : string) {
    if (chosenView === activeView) {
      setActiveGridSize(generalGridSizeNoMenu);
      setViewTransition(false);

    } else {
      setActiveGridSize(generalGridSizeRegular);
      setActiveView(chosenView);
      setViewTransition(true);
    }
    setActiveEntry(null);
  }

  function fadeoutView(): string { // Halb kood aga töötab, vaata üle
    if (viewTransition === false) {
      return 'fade-out';
    } else {
      return '';
    }
  }

  function checkMenuBarCollapse(): void {
    const width = window.innerWidth;
    if (width < collapseWidth) {
      setCollapseMenuBar(true)
    } else {
      setCollapseMenuBar(false)
    }
  }

  let view;
  let menuBar;
  if (activeView === 'season') {
    menuBar =
        <MenuBar  
          viewType={'season'} 
          choice={(chosenSeason: string) => { chooseEntry(chosenSeason, seasons) }} 
          category={Object.keys(seasons)}
          selectedEntries={new Set()}/>
    view = 
      <SeasonViewWrapper
      fadeOut={fadeoutView()}
      seasons={seasons}
      activeEntry={activeEntry as Season | null}/>

  } else if (activeView === 'team') {
    menuBar = 
      <MenuBar  
        viewType={'team'} 
        choice={(chosenTeam: string) => { chooseEntry(chosenTeam, teams) }} 
        category={Object.keys(teams)}
        selectedEntries={new Set()}/>
    view =   
      <TeamViewWrapper
        fadeOut={fadeoutView()}
        teams={teams}
        seasonNames={Object.keys(seasons)}
        activeEntry={activeEntry as Team | null}
        collapseWidth={collapseWidth}/>;
  }
  if (collapseMenuBar && activeEntry !== null) {
    menuBar = undefined;
  }

  return (
      <Box>
        <Grid container>
          <Grid size={activeGridSize[0]}>
              {menuBar}
          </Grid>
          <Grid size={activeGridSize[1]}>
              <Header
                activeView={activeView}
                choice={(chosenView) => chooseView(chosenView)}
                collapseWidth = {collapseWidth}/>
          </Grid>
          <Grid container size={12}>
            <Grid size={entryGridSize[0]}></Grid>
            <Grid size={entryGridSize[1]}>
              <Transition
                nodeRef={nodeRef}
                in={viewTransition}
                timeout={450}
                onExited={() => setActiveView('')}>
                {() => view}
              </Transition>
            </Grid>
          </Grid>
        </Grid>
      </Box>
  );
};

export default App;
