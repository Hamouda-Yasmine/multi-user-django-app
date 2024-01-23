import React, { createContext, useContext, useState,useEffect } from 'react';

export const AppContext = createContext();

// Custom hook to use the app state
export const useAppState = () => {
  const [state, setState] = useContext(AppContext);
  return { state, setState };
};

// App context provider component
export const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,});
  useEffect(() => {
    if (localStorage.getItem('user')){
     const storedUser = JSON.parse(localStorage.getItem('user'));
     if (storedUser) {
      setState((prev) => ({ ...prev, user: storedUser }));
    }
    }
    
  }, []);
  return (

 
    <AppContext.Provider value={[state, setState]}>
      
      {children}
    </AppContext.Provider>
  );
};








