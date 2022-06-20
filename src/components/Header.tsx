import * as React from 'react';
import { act } from 'react-test-renderer';
import styles from '../style.css';

type MyProps = {
  choice : Function;
  activeView: string;
}

const Header = ({ choice, activeView } : MyProps) => {
  function visualizeActiveButton(buttonName : string): string {
    if (activeView == buttonName) {
      return 'header-active';
    } else {
      return '';
    }
  }
  return (
        <div className={[styles['header']].join(' ')}>
            <h1>Stats for {activeView == '' ? 'something' : activeView}</h1>
            <ul>
                <li><button id={styles[visualizeActiveButton('team')]} onClick={() => { choice('team'); }}>Check team</button></li>
                <li><button id={styles[visualizeActiveButton('season')]} onClick={() => { choice('season'); }}>Check season</button></li>
            </ul>
        </div>
  );
};

export default Header;
