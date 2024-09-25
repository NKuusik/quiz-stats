// SelectedEntriesContext
import React, { createContext, useContext } from 'react';

type MyProps = {
   children: React.ReactNode;
   selectedEntries: Set<string> 
 }

const SelectedEntriesContext = createContext<Set<string>>(new Set());
export const SelectedEntriesProvider = ({ children, selectedEntries }: MyProps) => {

return (
 <SelectedEntriesContext.Provider value={selectedEntries}>
    {children}
 </SelectedEntriesContext.Provider>
 );
};

export const useSelectedEntries = () => useContext(SelectedEntriesContext)
