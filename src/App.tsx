import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import {parseData} from './scripts/readData';
import {Team} from './classes/EntityChildren/Team';
import {Season} from './classes/EntityChildren/Season';
import TeamViewWrapper from './components/TeamViewWrapper';
import SeasonViewWrapper from './components/SeasonViewWrapper';
import Header from './components/Header';
import {Transition} from 'react-transition-group';
import styles from './style.css';

type MyProps = {
  rawData: any;
  collapseWidth: number;
}

const App = ({rawData, collapseWidth}: MyProps) => {
  const [teams, setTeams] = useState<{[teamName: string]: Team}>({});
  const [seasons, setSeasons] = useState<{[seasonName: string]: Season}>({});
  const [activeView, setActiveView] = useState<string>('');
  const [viewTransition, setViewTransition] = useState<boolean>(false);
  const [categorySelectionStyle, setCategorySelectionStyle] = useState<any>(styles['app-wrapper']);
  const [activeEntry, setActiveEntry] = useState<Season | Team | null>(null);
    
  useEffect(() => {
    window.addEventListener('resize', () => {
      extendMenuBar(collapseWidth)
    })
  })

  useEffect(() => {
    const parsedSeasons: {[seasonName: string]: Season} = {};
    extendMenuBar(collapseWidth);
    let allTeams: {[teamName: string]: Team} = {}
    for (const season of Object.values(rawData)) {
      axios.get(season)
        .then((res: { data: string; }) => { // Mõtle, kas kogu see eraldi mooduliks
          return parseData(res.data);
        })
        .then((parsedData: { data: any[]; }) => {
          const currentSeasonName: string = `season ${parsedData.data[0]}`;
          const currentSeasonTeamNames: string[] = [];
          const currentSeason = new Season(currentSeasonName);
          
          for (let i = 1; i < parsedData.data.length - 1; i++) {
            const rawTeamData: string[] = parsedData.data[i];
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

  function extendMenuBar(collapseWidth: number): any {
    const width = window.innerWidth;
    if (width < collapseWidth && categorySelectionStyle === styles['app-wrapper']) {

      if (activeEntry === null) {
        setCategorySelectionStyle(styles['app-wrapper-extended']);
      } else {
        setCategorySelectionStyle(styles['app-wrapper-collapsed']);
      }
    } else if (width > collapseWidth) {
      setCategorySelectionStyle(styles['app-wrapper']);
    }
  }

  function chooseEntry(entryName: string, data: {[key: string]: Season} | {[key: string]: Team}) {    
    if (activeEntry === data[entryName]) {
      setActiveEntry(null);
    } else {
      setActiveEntry(data[entryName]);
    }
  }

  function chooseView(chosenView : string) {
    const width = window.innerWidth;
    if (chosenView === activeView && width > collapseWidth) {
      setViewTransition(false);
    } else {
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

  function transitionCollapsedToExtendedView(collapseWidth: number): void {
    const width = window.innerWidth;
    if (width < collapseWidth && categorySelectionStyle === styles['app-wrapper-collapsed']) {
      setCategorySelectionStyle(styles['app-wrapper-extended']);
    }
  }

  function collapseMenuBar(collapseWidth: number): void {
    const width = window.innerWidth;
    if (width < collapseWidth) {
      setCategorySelectionStyle(styles['app-wrapper-collapsed']);
    }
  }

  let view;
  if (activeView === 'season') {
    view = <SeasonViewWrapper
      fadeOut={fadeoutView()}
      seasons={seasons}
      collapseMenuBarFunction={() => collapseMenuBar(collapseWidth)}
      chooseSeasonFunction={(chosenSeason) => chooseEntry(chosenSeason, seasons)}
      activeEntry={activeEntry as Season | null}
      />;
  } else if (activeView === 'team') {
    view = <TeamViewWrapper
      fadeOut={fadeoutView()}
      teams={teams}
      seasonNames={Object.keys(seasons)}
      collapseMenuBarFunction={() => collapseMenuBar(collapseWidth)}
      chooseTeamFunction={(chosenTeam) => chooseEntry(chosenTeam, teams)}
      activeEntry={activeEntry as Team | null}
      />;
  }
    return (
      <div className={categorySelectionStyle}>
        <Header
          activeView={activeView}
          choice={(chosenView) => chooseView(chosenView)}
          smallLayoutTransitions={() => {transitionCollapsedToExtendedView(collapseWidth); }}
          />
        <Transition
          in={viewTransition}
          timeout={450}
          onExited={() => setActiveView('')}
        >
          {() => view}
        </Transition>

      </div>
    );
  }

export default App;


