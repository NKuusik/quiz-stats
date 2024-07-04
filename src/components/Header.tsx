import * as React from 'react';
import styles from '../style.css';

type MyProps = {
  choice : Function;
  smallLayoutTransitions: Function;
  activeView: string;
}

const Header = ({choice, activeView, smallLayoutTransitions} : MyProps) => {
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

  return (
        <div className={[styles['header']].join(' ')}>
            <h1>Stats for {activeView === '' ? 'something' : activeView}</h1>
            <ul>
                <li><button id={styles[visualizeActiveButton('team')]} onClick={() => {
                  handleClick('team');
                }}>Check team</button></li>
                <li><button id={styles[visualizeActiveButton('season')]} onClick={() => {
                  handleClick('season');
                }}>Check season</button></li>
            </ul>
        </div>
  );
};

export default Header;
