import React from 'react';
import styles from '../style.css';

type MyProps = {
  category : Object;
  choice : any;
}

class MenuBar extends React.Component<MyProps> {
  constructor (props) {
    super(props);
    this.state = {
      activeTeam: null
    };
  }

  render () {
    return (
            <div>
              <h1>Choose which team/season you want to check.</h1>
                <div >
                {Object.values(this.props.category).map(entryInCategory => (
                <div key={ entryInCategory.name }className={styles['entry-selection']} onClick={() => this.props.choice(entryInCategory)}>
                    {entryInCategory.name}
                </div>
                ))}
              </div>
            </div>

    );
  }
}

export default MenuBar;
