import React, {useState} from 'react';
import styles from '../style.css';

function Header(props) { //Todo: Does not toggle.
    return(
        <div className={styles["header"]}>
            <ul>
                <li><h2 onClick={() => {props.choice("team")}}>Check team</h2></li>
                <li><h2 onClick={() => {props.choice("season")}}>Check season</h2></li>
            </ul>
        </div>
    );
}

export default Header;