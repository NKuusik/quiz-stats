import * as React from 'react';
import styles from '../style.css';

type MyProps = {
  choice : any
}

const Header = ({ choice } : MyProps) => { // Todo: Does not toggle.
  return (
        <div className={styles['header']}>
            <ul>
                <li><h2 onClick={() => { choice('team'); }}>Check team</h2></li>
                <li><h2 onClick={() => { choice('season'); }}>Check season</h2></li>
            </ul>
        </div>
  );
};

export default Header;
