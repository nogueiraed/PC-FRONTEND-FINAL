import { useState, createContext } from "react";

export const UserContext = createContext([]);

export default function GlobalContext(props) {
  const [user, setUser] = useState({
    name: "",
    logged: false,
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}
