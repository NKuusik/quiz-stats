import React from 'react';
import {Season} from '../classes/EntityChildren/Season';
import {Team} from '../classes/EntityChildren/Team';
import styles from '../style.css';
import SearchField from '../subcomponents/SearchField';

type MyProps = {
  category : {[seasonName: string]: Season} | {[teamName: string]: Team};
  choice : Function;
  viewType : string;
}

type MyState = {
  allEntries: string[];
  matchedEntries: string[];
}

class MenuBar extends React.Component<MyProps, MyState> {
  private menuBarRef = React.createRef<HTMLDivElement>();
  constructor(props: MyProps) {
    super(props);
    this.state = {
      allEntries: Object.keys(this.props.category),
      matchedEntries: Object.keys(this.props.category).sort()
    };
  }

  filterEntries(entriesValue: string[]): void {
    this.setState({matchedEntries: entriesValue.sort()});
  }

  handleMouseDown(event: MouseEvent): void {
    const startCoordinateY = event.clientY;

    const handleMouseMove = (event: MouseEvent) => {
      const distanceMoved = startCoordinateY - event.clientY;
      this.menuBarRef.current!.scrollTop = startCoordinateY + distanceMoved;
    };

    const handleMouseUp = () => {
      this.menuBarRef.current!.removeEventListener('mousemove', handleMouseMove);
      this.menuBarRef.current!.removeEventListener('mouseup', handleMouseUp);
    };

    this.menuBarRef.current!.addEventListener('mousemove', handleMouseMove);
    this.menuBarRef.current!.addEventListener('mouseup', handleMouseUp);
  }

  render() {
    return (
            <div className={styles['menu-bar-container']}>
              <SearchField viewType={this.props.viewType} menuBarEntries={this.state.allEntries} onFieldValueChange={this.filterEntries.bind(this)}/>
                <div ref={this.menuBarRef} onMouseDown={this.handleMouseDown.bind(this)} className={styles['menu-bar-selection']}>
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
