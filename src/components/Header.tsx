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
              {
                //Todo: miks siin <p>? Tee ymber <button>
              }
                <li><p className={styles[visualizeActiveButton('team')]} onClick={() => { choice('team'); }}>Check team</p></li>
                <li><p className={styles[visualizeActiveButton('season')]} onClick={() => { choice('season'); }}>Check season</p></li>
            </ul>
        </div>
  );
};

export default Header;
