import React, { useState } from "react";

export const AppContext = React.createContext({});

const AppContextProvider = ({ children }) => {
  const [resume, setResume] = useState({});
  return (
    <AppContext.Provider value={{ resume, setResume }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
