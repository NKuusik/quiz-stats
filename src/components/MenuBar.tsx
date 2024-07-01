import React, {createRef, useState} from 'react';
import styles from '../style.css';
import SearchField from '../subcomponents/SearchField';

// Todo: kui valida menüüst elementi võiks SearchField minna tühjaks.

type MyProps = {
  category : string[];
  choice : Function;
  viewType : string;
}

type MyState = {
  allEntries: string[];
  matchedEntries: string[];
  inputResetToggle: boolean;
  menuBarContainerStyle: string;
}
/*
function  changeStyleIfCollapsed() {
  const isCollapsed = true
  if (isCollapsed)
    this.setState({menuBarContainerStyle: 'menu-bar-container-collapsed'})
  }

import * as React from 'react';
import styles from '../style.css';

type MyProps = {
  choice : Function;
  activeView: string;
}

const Header = ({choice, activeView} : MyProps) => {
  function visualizeActiveButton(buttonName : string): string {
    if (activeView === buttonName) {
      return 'header-active';
    } else {
      return '';
    }
  }
  return (
        <div className={[styles['header']].join(' ')}>
            <h1>Stats for {activeView === '' ? 'something' : activeView}</h1>
            <ul>
                <li><button id={styles[visualizeActiveButton('team')]} onClick={() => { choice('team'); }}>Check team</button></li>
                <li><button id={styles[visualizeActiveButton('season')]} onClick={() => { choice('season'); }}>Check season</button></li>
            </ul>
        </div>
  );
};

export default Header;


  */
/*
const MenuBar = ({category, choice, viewType} : MyProps) => {
  const [allEntries, setAllEntries] = useState(category);
  const [matchedEntries, setMatchedEntries] = useState(category.sort());
  const [inputResetToggle, setInputResetToggle] = useState(false);
  const [menuBarContainerStyle, setMenuBarContainerStyle] = useState('menu-bar-container');

  private menuBarRef = React.createRef<HTMLDivElement>();
  function filterEntries(entriesValue: string[]): void {
    this.setState({matchedEntries: entriesValue.sort()});
  }

  function handleMouseDown(event: MouseEvent): void {
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

  function toggleSearchFieldInput() {
    if (this.state.inputResetToggle === false) {
      this.setState({inputResetToggle: true});
    } else {
      this.setState({inputResetToggle: false});      
    }
  }

  return (
    <div className={styles[this.state.menuBarContainerStyle]}>
      <SearchField viewType={this.props.viewType} menuBarEntries={this.state.allEntries} onFieldValueChange={this.filterEntries.bind(this)} inputResetToggle={this.state.inputResetToggle} />
        <div ref={this.menuBarRef} onMouseDown={this.handleMouseDown.bind(this)} className={styles['menu-bar-selection']}>
        {
        this.state.matchedEntries.map(entry => (
            <div key={entry} className={styles['entry-selection']}
              onClick={() => {
                this.toggleSearchFieldInput();
                this.props.choice(entry)}}>
              {entry}
            </div>
        ))}
      </div>
    </div>
);


 }
*/
/**** */
class MenuBar extends React.Component<MyProps, MyState> {
  private menuBarRef = React.createRef<HTMLDivElement>();
  public searcFieldInputRef = React.createRef<string>();
  constructor(props: MyProps) {
    super(props);
    this.state = {
      allEntries: this.props.category,
      matchedEntries: this.props.category.sort(),
      inputResetToggle: false,
      menuBarContainerStyle: 'menu-bar-container',
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

  toggleSearchFieldInput() {
    if (this.state.inputResetToggle === false) {
      this.setState({inputResetToggle: true});
    } else {
      this.setState({inputResetToggle: false});      
    }
  }


  
  

  render() {

    console.log('test')
    


/* 
  For multiple classes, use
  <div className={[styles['menu-bar-container'], styles['menu-bar-container-collapsed']].join(' ')}>
*/
    return (
            <div className={styles[this.state.menuBarContainerStyle]}>
              <SearchField viewType={this.props.viewType} menuBarEntries={this.state.allEntries} onFieldValueChange={this.filterEntries.bind(this)} inputResetToggle={this.state.inputResetToggle} />
                <div ref={this.menuBarRef} onMouseDown={this.handleMouseDown.bind(this)} className={styles['menu-bar-selection']}>
                {
                this.state.matchedEntries.map(entry => (
                    <div key={entry} className={styles['entry-selection']}
                      onClick={() => {
                        this.toggleSearchFieldInput();
                        this.props.choice(entry)}}>
                      {entry}
                    </div>
                ))}
              </div>
            </div>
    );
  }
}

export default MenuBar;
