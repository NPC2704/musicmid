import { createContext, useState } from "react";
export const AppContext = createContext();
export const AppProvider2 = ({ children }) => {
  const [link1, setLink] = useState(0);
  console.log(link1);
  return (
    <AppContext.Provider value={{ link1, setLink }}>
      {children}
    </AppContext.Provider>
  );
};
