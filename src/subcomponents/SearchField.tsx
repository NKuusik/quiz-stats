import React, { useState } from 'react';
import styles from '../style.css';

type MyProps = {
    menuBarEntries: string[],
    onFieldValueChange: any
}

const SearchField = ({ menuBarEntries, onFieldValueChange }: MyProps) => {
  const [searchFieldValue, setSearchFieldValue] = useState('');

  const handleChange = (event) => {
    setSearchFieldValue(event.target.value);
  };

  function findMatchingNames (searchInput: string, names: string[]) { // Make case insensitive
    const foundMatches : string[] = [];
    for (const entry of names) {
      if (entry.includes(searchInput)) {
        foundMatches.push(entry);
      }
    }
    return foundMatches;
  }

  function search () {
    const matchedEntries = findMatchingNames(searchFieldValue, menuBarEntries); // Optimeerime nii, et ainult siis otsime, kui v2ljal rohkem kui 1 t2hte.
    onFieldValueChange(matchedEntries);
  }

  return (
    <div id={styles['search-field']}>
        <form>
            <input type="text" placeholder='Search...' value={searchFieldValue} onChange={handleChange} onKeyUp={search}/>
        </form>
    </div>
  );
};

export default SearchField;
