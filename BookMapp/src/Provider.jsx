import { createContext, useState, useContext } from "react";

export const Context = createContext();

export const Provider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <Context.Provider
      value={{
        isSignedIn,
        setIsSignedIn,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAuth = () => useContext(Context);
