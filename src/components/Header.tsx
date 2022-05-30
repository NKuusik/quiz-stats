import * as React from 'react';
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
        <div className={styles['header']}>
            <ul>
                <li><p className={styles[visualizeActiveButton('team')]} onClick={() => { choice('team'); }}>Check team</p></li>
                <li><p className={styles[visualizeActiveButton('season')]} onClick={() => { choice('season'); }}>Check season</p></li>
            </ul>
        </div>
  );
};

export default Header;
