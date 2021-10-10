import * as React from 'react';
import styles from '../style.css';

function Header(props) { //Todo: Does not toggle.
    return(
        <div className={styles["header"]}>
               <div onClick={() => {props.choice("team")}}>Check team</div>
               <div onClick={() => {props.choice("season")}}>Check season</div>
        </div>
    );
}

export default Header;