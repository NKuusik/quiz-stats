import React, {createRef} from 'react';
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
}


class MenuBar extends React.Component<MyProps, MyState> {
  private menuBarRef = React.createRef<HTMLDivElement>();
  public searcFieldInputRef = React.createRef<string>();
  constructor(props: MyProps) {
    super(props);
    this.state = {
      allEntries: this.props.category,
      matchedEntries: this.props.category.sort(),
      inputResetToggle: false,
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

/*    <div className={[styles.App, styles.bold, styles['d-flex-c']].join(' ')}></div>*/
    return (
            <div className={[styles['menu-bar-container'], styles['menu-bar-container-collapsed']].join(' ')}>
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
