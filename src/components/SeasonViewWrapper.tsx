import React, {useState} from 'react';
import MenuBar from './MenuBar';
import SeasonView from './SeasonView';
import styles from '../style.css';
import {Season} from '../classes/EntityChildren/Season';
import axios from '../../node_modules/axios/index';

type MyProps = {
  seasons : {[seasonName: string]: Season};
  fadeOut: string;
}

function SeasonViewWrapper({seasons, fadeOut} : MyProps) {
  const [activeSeason, setActiveSeason] = useState<Season | null>(null);
  const [isRequestFinished, setIsRequestFinished] = useState<boolean>(true);

  function chooseSeason(seasonName: string) {
    setIsRequestFinished(false);
    let promises: Promise<any>[] = [];
    for (let teamName in seasons[seasonName].teams) {
      promises.push(
        axios.get(`http://localhost:8080/quiz_stats/teams/${teamName}/`).
          then((res) => {
            seasons[seasonName].teams[teamName].rankings = res.data.rankings;
            seasons[seasonName].teams[teamName].seasons = res.data.seasons;
            seasons[seasonName].teams[teamName].totalPoints = res.data.total_points;
            seasons[seasonName].teams[teamName].results = res.data.results;
            seasons[seasonName].ranking[res.data.rankings[seasonName] - 1] = teamName;
          })       
      );
    }
    Promise.all(promises).then(() => {
      setIsRequestFinished(true);
      if (activeSeason === seasons[seasonName]) {
        setActiveSeason(null);
      } else {
        setActiveSeason(seasons[seasonName]);
      }
    });
  }
  let seasonView;
  if (activeSeason != null && isRequestFinished) {
    seasonView = <SeasonView season={activeSeason} />;
  }

  return (
    <div id={styles[fadeOut]} className={styles['view-wrapper']}>
      <div className={styles['category-selection']}>
        <MenuBar viewType={'season'} category={Object.keys(seasons)} choice={(chosenSeason: string) => { chooseSeason(chosenSeason); }} />
      </div>
      <div className={styles['chart-view']}>
        {seasonView}
        </div>
    </div>
  );
}

export default SeasonViewWrapper;
