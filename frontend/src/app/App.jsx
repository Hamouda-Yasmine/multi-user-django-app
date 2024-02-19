import React, { createContext, useContext, useState, useEffect } from "react";

export const AppContext = createContext();

// Custom hook to use the app state
export const useAppState = () => {
  const [state, setState] = useContext(AppContext);
  return { state, setState };
};

// App context provider component
export const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    user: JSON.parse(localStorage.getItem("user")),
    data:JSON.parse(localStorage.getItem("data")),
  });
  useEffect(() => {
    if (localStorage.getItem("user")) {
      console.log(JSON.parse(localStorage.getItem("user")));
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const storedData=JSON.parse(localStorage.getItem("data"));
      if (storedUser) {
       setState((prev) => ({ ...prev, user: storedUser,data:storedData }));
      }
    }
  }, []);
  return (
    <AppContext.Provider value={[state, setState]}>
      {children}
    </AppContext.Provider>
  );
};
