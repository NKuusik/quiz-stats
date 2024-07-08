import * as React from 'react';
import styles from '../style.css';

type MyProps = {
  choice : Function;
  smallLayoutTransitions: Function;
  activeView: string;
  collapseWidth: number
}

const Header = ({choice, activeView, smallLayoutTransitions, collapseWidth} : MyProps) => {
  function visualizeActiveButton(buttonName : string): string {
    if (activeView === buttonName) {
      return 'header-active';
    } else {
      return '';
    }
  }

  function handleClick(choiceName: string): void {
    choice(choiceName);
    smallLayoutTransitions();
  }

  let buttonTextStart = 'Check'

  if (window.innerWidth < collapseWidth) {
    buttonTextStart = ''
  }

  return (
        <div className={[styles['header']].join(' ')}>
            <h1>Stats for {activeView === '' ? 'something' : activeView}</h1>
            <ul>
                <li><button id={styles[visualizeActiveButton('team')]} className={styles['button-header']}  onClick={() => {
                  handleClick('team');
                }}>{buttonTextStart} team</button></li>
                <li><button id={styles[visualizeActiveButton('season')]} className={styles['button-header']} onClick={() => {
                  handleClick('season');
                }}>{buttonTextStart} season</button></li>
            </ul>
        </div>
  );
};

export default Header;
