// SelectedEntriesContext
import React, { createContext, useContext } from 'react';

const SelectedEntriesContext = createContext<Set<any>>(new Set());
export const SelectedEntriesProvider = ({ children, selectedEntries }) => {

return (
 <SelectedEntriesContext.Provider value={selectedEntries}>
    {children}
 </SelectedEntriesContext.Provider>
 );
};

export const useSelectedEntries = () => useContext(SelectedEntriesContext)
