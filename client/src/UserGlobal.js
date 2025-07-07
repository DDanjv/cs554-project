import { createContext, useState, useContext } from "react";

const UserGlobal = createContext();

const UserGlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <UserGlobal.Provider value={{ user, login, logout }}>
      {children}
    </UserGlobal.Provider>
  );
};

const useUserGlobal = () => useContext(UserGlobal);

export { UserGlobalProvider, useUserGlobal };
