import React, { useState } from 'react';

type MyProps = {
    menuBarEntries: string[],
    onFieldValueChange: any
}

const SearchField = ({menuBarEntries: menuBarEntries, onFieldValueChange: onFieldValueChange}: MyProps) => {
    const [searchFieldValue, setSearchFieldValue] = useState("");

    const handleChange = (event) => {
        setSearchFieldValue(event.target.value);
    }
    
    function search() {
        let matchedEntries = findMatchingNames(searchFieldValue, menuBarEntries); // Optimeerime nii, et ainult siis otsime, kui v2ljal rohkem kui 1 t2hte.
        onFieldValueChange(matchedEntries);
    }

    function findMatchingNames(searchInput: string, names: string[]) { // Make case insensitive
        let foundMatches : string[] = [];
        for (let entry of names) {
            if (entry.includes(searchInput)) {
                foundMatches.push(entry);
            }
        }
        return foundMatches;
    }
    return(
        <div>
            <form>
                <input type="text" placeholder='Search...' value={searchFieldValue} onChange={handleChange} onKeyUp={search}/>
            </form>
        </div>
    )
}

export default SearchField;