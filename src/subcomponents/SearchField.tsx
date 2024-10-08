import React, {useState, useEffect} from 'react';
import * as styles from '../style.css';

type MyProps = {
    menuBarEntries: string[];
    onFieldValueChange: (entriesValue: string[]) => void;
    viewType: string;
    inputResetToggle: boolean;
}

const SearchField = ({menuBarEntries, onFieldValueChange, viewType, inputResetToggle}: MyProps) => {
  const [searchFieldValue, setSearchFieldValue] = useState('');

  useEffect(() => {
    setSearchFieldValue('');
    onFieldValueChange(menuBarEntries);
  }, [inputResetToggle]);

  const handleChange = (event) => {
    setSearchFieldValue(event.target.value);
  };

  const preventSubmitWithEnter = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  function findMatchingNames(searchInput: string, names: string[]): string[] {
    const foundMatches : string[] = [];
    for (const entry of names) {
      const entryLowerCase = entry.toLowerCase();
      if (entryLowerCase.includes(searchInput.toLowerCase())) {
        foundMatches.push(entry);
      }
    }
    return foundMatches;
  }

  function search(): void {
    let matchedEntries = menuBarEntries;
    const trimmedInput = searchFieldValue.trim();
    if (trimmedInput.length > 0) {
      matchedEntries = findMatchingNames(trimmedInput, menuBarEntries);
    }
    onFieldValueChange(matchedEntries);
  }

  return (
    <div id={styles['search-field']}>
        <form>
            <input type="text" placeholder={viewType} value={searchFieldValue} onChange={handleChange} onKeyUp={search} onKeyDown={preventSubmitWithEnter}/>
        </form>
    </div>
  );
};

export default SearchField;
