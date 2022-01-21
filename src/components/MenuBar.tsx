import React from 'react';
import styles from '../style.css';
import SearchField from '../subcomponents/SearchField';

type MyProps = {
  category : Object;
  choice : any;
  viewType : string;
}

type MyState = {
  allEntries: string[]; // Parem kui see oleks juba tehtud kõrgemal tasemel ja siin props.
  matchedEntries: string[];
}

class MenuBar extends React.Component<MyProps, MyState> {
  constructor (props) {
    super(props);
    this.state = {
      allEntries: Object.keys(this.props.category),
      matchedEntries: Object.keys(this.props.category)
    };
  }

  initializeEntries() {
    let entriesInMenuBar :  string[] = [];   
    entriesInMenuBar = Object.keys(this.props.category);
    return entriesInMenuBar;
  }  

  filterEntries(entriesValue) {
    this.setState({matchedEntries: entriesValue})  
  }

  render() {
    return (
            <div>
              <h1>Choose which team/season you want to check.</h1>
              <SearchField menuBarEntries={this.state.allEntries} onFieldValueChange={this.filterEntries.bind(this)}/>
                <div >
                {
                this.state.matchedEntries.map(entry => (
                    <div key={this.props.category[entry].name} className={styles['entry-selection']} 
                      onClick={() => this.props.choice(this.props.category[entry])}>
                      {this.props.category[entry].name}
                    </div>
              ))}
              </div>
            </div>
    );
  }
}

export default MenuBar;
