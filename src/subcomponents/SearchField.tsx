import React, { useState } from 'react';
import styles from '../style.css';

type MyProps = {
    menuBarEntries: string[];
    onFieldValueChange: Function;
    viewType: string;
}

//Todo: menu bar vaartuste j'rjekord muutub pärast kirjutamist

const SearchField = ({ menuBarEntries, onFieldValueChange, viewType }: MyProps) => {
  const [searchFieldValue, setSearchFieldValue] = useState('');

  const handleChange = (event) => {
    setSearchFieldValue(event.target.value);
  };

  const preventSubmitWithEnter = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  function findMatchingNames (searchInput: string, names: string[]) {
    console.log(searchInput);
    const foundMatches : string[] = [];
    for (const entry of names) {
      let entryLowerCase = entry.toLowerCase();
      if (entryLowerCase.includes(searchInput.toLowerCase())) {
        foundMatches.push(entry);
      }
    }
    return foundMatches;
  }

  function search () {
    let matchedEntries = menuBarEntries;
    let trimmedInput = searchFieldValue.trim();
    if (trimmedInput.length > 0) {
      matchedEntries = findMatchingNames(trimmedInput, menuBarEntries);
    }
    onFieldValueChange(matchedEntries);
  }


  return (
    <div id={styles['search-field']} className={styles['header-vertical-alignment']}>
        <form>
            <input type="text" placeholder={`Search ${viewType}`} value={searchFieldValue} onChange={handleChange} onKeyUp={search} onKeyDown={preventSubmitWithEnter}/>
        </form>
    </div>
  );
};

export default SearchField;
