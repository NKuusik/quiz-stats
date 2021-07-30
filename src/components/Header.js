import React, {useState} from 'react';
import styles from '../style.css';

function Header(props) {
    return(
        <div className={styles["header"]}>
            <ul>
                <li><h2 onClick={() => {props.choice("team")}}>Check single team accross seasons.</h2></li>
                <li><h2 onClick={() => {props.choice("season")}}>Check single season in comparison to teams</h2></li>
            </ul>
        </div>
    );
}

export default Header;