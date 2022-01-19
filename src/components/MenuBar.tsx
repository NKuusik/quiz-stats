import React from 'react';
import styles from '../style.css';
import SearchField from '../subcomponents/SearchField';

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
    const teamNames = Object.keys(this.props.category);
    return (
            <div>
              <h1>Choose which team/season you want to check.</h1>
              <SearchField teamNames={teamNames}/>
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
