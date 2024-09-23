import * as React from 'react';
import * as styles from '../style.css';
import Grid from '@mui/material/Grid2';

type MyProps = {
  choice : (chosenView: string) => void;
  activeView: string;
  collapseWidth: number
}

const Header = ({choice, activeView, collapseWidth} : MyProps) => {
  function visualizeActiveButton(buttonName : string): string {
    if (activeView === buttonName) {
      return 'header-active';
    } else {
      return '';
    }
  }

  function handleClick(choiceName: string): void {
    choice(choiceName);
  }

  let buttonTextStart = 'Check';

  if (window.innerWidth < collapseWidth) {
    buttonTextStart = '';
  }

  return (
        <div className={[styles['header']].join(' ')}>
            <Grid container>
              <Grid>
                <h1>Stats for {activeView === '' ? 'something' : activeView}</h1>
              </Grid>
              <Grid size={{xs: 12, sm: 6, md: 5, lg: 4, xl:3}} offset={{xs: 0, md: "auto"}}>
                <ul>
                  <li><button id={styles[visualizeActiveButton('team')]} className={styles['button-header']} onClick={() => {
                    handleClick('team');
                  }}>{buttonTextStart} team</button></li>
                  <li><button id={styles[visualizeActiveButton('season')]} className={styles['button-header']} onClick={() => {
                    handleClick('season');
                  }}>{buttonTextStart} season</button></li>
                </ul>
              </Grid>
            </Grid>

        </div>
  );
};

export default Header;
