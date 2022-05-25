import * as React from 'react';
import styles from '../style.css';

type MyProps = {
  choice : any
}



const Header = ({ choice } : MyProps) => {
  return (
        <div className={styles['header']}>
            <ul>
                <li><p onClick={() => { choice('team'); }}>Check team</p></li>
                <li><p onClick={() => { choice('season'); }}>Check season</p></li>
            </ul>
        </div>
  );
};

export default Header;
