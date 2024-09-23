import React, {useState, useRef, useEffect} from 'react';
import * as styles from '../style.css';
import SearchField from '../subcomponents/SearchField';

// Todo: kui valida menüüst elementi võiks SearchField minna tühjaks.
type MyProps = {
  category : string[];
  choice : (chosenSeason: string) => void;
  viewType : string;
}

const MenuBar = ({category, choice, viewType} : MyProps) => {
  const [matchedEntries, setMatchedEntries] = useState(category.sort());
  const [inputResetToggle, setInputResetToggle] = useState(false);
  const menuBarRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setMatchedEntries(category.sort()),
    toggleSearchFieldInput()
  }, [viewType])

  function filterEntries(entriesValue: string[]): void {
    setMatchedEntries(entriesValue.sort());
  }

  function handleMouseDown(event: MouseEvent): void {
    const startCoordinateY = event.clientY;

    const handleMouseMove = (event: MouseEvent) => {
      const distanceMoved = startCoordinateY - event.clientY;
      menuBarRef.current!.scrollTop = startCoordinateY + distanceMoved;
    };

    const handleMouseUp = () => {
      menuBarRef.current!.removeEventListener('mousemove', handleMouseMove);
      menuBarRef.current!.removeEventListener('mouseup', handleMouseUp);
    };

    menuBarRef.current!.addEventListener('mousemove', handleMouseMove);
    menuBarRef.current!.addEventListener('mouseup', handleMouseUp);
  }

  function toggleSearchFieldInput() {
    if (inputResetToggle === false) {
      setInputResetToggle(true);
    } else {
      setInputResetToggle(false);
    }
  }

  return (
    <div className={styles['menu-bar-container']}>
      <SearchField 
        viewType={viewType} 
        menuBarEntries={category} 
        onFieldValueChange={filterEntries.bind(this)} 
        inputResetToggle={inputResetToggle} />
        <div ref={menuBarRef} onMouseDown={handleMouseDown.bind(this)} className={styles['menu-bar-selection']}>
        {
        matchedEntries.map(entry => (
            <div data-testid="matched-entry" key={entry} className={styles['entry-selection']}
              onClick={() => {
                toggleSearchFieldInput();
                choice(entry);
              }}>
              {entry}
            </div>
        ))}
      </div>
    </div>
  );
};

export default MenuBar;
