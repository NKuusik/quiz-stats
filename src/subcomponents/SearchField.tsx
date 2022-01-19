import React, { useState } from 'react';

type MyProps = {
    menuBarEntries: string[]
}

const SearchField = ({menuBarEntries: teamNames}: MyProps) => {
    const [searchFieldValue, setSearchFieldValue] = useState("");

    const handleChange = (event) => {
        setSearchFieldValue(event.target.value);
    }
    
    function search() {
        findMatchingNames(searchFieldValue, teamNames); // Optimeerime nii, et ainult siis otsime, kui v2ljal rohkem kui 1 t2hte.
    }

    function findMatchingNames(searchInput: string, names: string[]) { // Make case insensitive
        let foundMatches : string[] = [];
        for (let entry of names) {
            if (entry.includes(searchInput)) {
                foundMatches.push(entry);
            }
        }
        console.log("Found following matches with " + searchInput);
        console.log(foundMatches);
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