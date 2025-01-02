import React, { createContext, useState } from 'react';

const MyContext = createContext();

const initialValue = {
  example: 'Hello, world!',
};

const MyContextProvider = ({ children }) => {
  const [value, setValue] = useState(initialValue);

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
