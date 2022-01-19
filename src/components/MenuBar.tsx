import React from 'react';
import styles from '../style.css';
import SearchField from '../subcomponents/SearchField';

type MyProps = {
  category : Object;
  choice : any;
  viewType : string;
}

class MenuBar extends React.Component<MyProps> {
  constructor (props) {
    super(props);
    this.state = {
      activeTeam: null
    };
  }


  render () {
    console.log(this.props.choice);
    let entriesInMenuBar :  string[] = []; 
    if (this.props.viewType === "teams") {
      entriesInMenuBar = Object.keys(this.props.category);
    } else if (this.props.viewType === "seasons") {
      for (let season of Object.values(this.props.category)) {
        entriesInMenuBar.push(season["name"]);
      }
    }

    return (
            <div>
              <h1>Choose which team/season you want to check.</h1>
              <SearchField menuBarEntries={entriesInMenuBar}/>
                <div >
                {Object.values(this.props.category).map(entryInCategory => (
                <div key={entryInCategory.name} className={styles['entry-selection']} onClick={() => this.props.choice(entryInCategory)}>
                    {entryInCategory.name}
                </div>
                ))}
              </div>
            </div>

    );
  }
}

export default MenuBar;
