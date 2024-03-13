import React, { useState } from "react";

const PathContext = React.createContext({
  path: "",
});

export const PathContextProvider = ({ children }) => {
  const [path, setPath] = useState("");

  const pathHandler = (currentPath) => {
    setPath(currentPath);
  };

  return (
    <PathContext.Provider value={{ path, onPathChange: pathHandler }}>
      {children}
    </PathContext.Provider>
  );
};

export default PathContext;
