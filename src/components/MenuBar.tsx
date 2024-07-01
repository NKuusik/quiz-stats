import React, {useState, useRef, useEffect} from 'react';
import styles from '../style.css';
import SearchField from '../subcomponents/SearchField';

// Todo: kui valida menüüst elementi võiks SearchField minna tühjaks.

type MyProps = {
  category : string[];
  choice : Function;
  viewType : string;
}

const MenuBar = ({category, choice, viewType} : MyProps) => {
  const [allEntries, setAllEntries] = useState(category);
  const [matchedEntries, setMatchedEntries] = useState(category.sort());
  const [inputResetToggle, setInputResetToggle] = useState(false);
  const [menuBarContainerStyle, setMenuBarContainerStyle] = useState('menu-bar-container');

  useEffect(() => {
    changeMenuBarContainerStyle();
  }, []);

  window.addEventListener('resize', () => {
    changeMenuBarContainerStyle();
  });

  const menuBarRef = useRef<any>();

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

  function changeMenuBarContainerStyle() {
    const width = window.innerWidth;
    if (width < 500) {
      setMenuBarContainerStyle('menu-bar-container-collapsed');
    } else {
      setMenuBarContainerStyle('menu-bar-container');
    }
  }

  return (
    <div className={styles[menuBarContainerStyle]}>
      <SearchField viewType={viewType} menuBarEntries={allEntries} onFieldValueChange={filterEntries.bind(this)} inputResetToggle={inputResetToggle} />
        <div ref={menuBarRef} onMouseDown={handleMouseDown.bind(this)} className={styles['menu-bar-selection']}>
        {
        matchedEntries.map(entry => (
            <div key={entry} className={styles['entry-selection']}
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
