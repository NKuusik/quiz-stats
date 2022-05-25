import React, { Ref } from 'react';
import styles from '../style.css';
import SearchField from '../subcomponents/SearchField';

type MyProps = {
  category : Object;
  choice : any;
  viewType : string; // Yleliigne
}

type MyState = {
  allEntries: string[]; // Parem kui see oleks juba tehtud kõrgemal tasemel ja siin props.
  matchedEntries: string[];
}

class MenuBar extends React.Component<MyProps, MyState> {
  private menuBarRef = React.createRef<HTMLDivElement>();
  constructor (props) {
    super(props);
    this.state = {
      allEntries: Object.keys(this.props.category),
      matchedEntries: Object.keys(this.props.category)
    };
  }

  initializeEntries () {
    let entriesInMenuBar : string[] = [];
    entriesInMenuBar = Object.keys(this.props.category);
    return entriesInMenuBar;
  }

  filterEntries (entriesValue) {
    this.setState({ matchedEntries: entriesValue });
  }

  handleMouseDown (event) {
    const startCoordinateY = event.clientY;

    const handleMouseMove = (event) => {
      const distanceMoved = startCoordinateY - event.clientY;
      this.menuBarRef.current!.scrollTop = startCoordinateY + distanceMoved;
    };

    const handleMouseUp = (event) => { // Miks siin argument "event"?
      this.menuBarRef.current!.removeEventListener('mousemove', handleMouseMove);
      this.menuBarRef.current!.removeEventListener('mouseup', handleMouseUp);
    };

    this.menuBarRef.current!.addEventListener('mousemove', handleMouseMove);
    this.menuBarRef.current!.addEventListener('mouseup', handleMouseUp);
  }

  render () {
    return (
            <div id={styles['menu-bar-container']}>
              <SearchField menuBarEntries={this.state.allEntries} onFieldValueChange={this.filterEntries.bind(this)}/>
                <div ref={this.menuBarRef} onMouseDown={this.handleMouseDown.bind(this)} id={styles['menu-bar-selection']}>
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
