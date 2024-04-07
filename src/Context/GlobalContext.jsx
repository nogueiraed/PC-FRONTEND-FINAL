import { useState, createContext } from "react";

export const Context = createContext([]);

export default function GlobalContext(props) {
  const [user, setUser] = useState({
    name: "",
    logged: false,
  });
  return (
    <Context.Provider value={{ user, setUser }}>
      {props.children}
    </Context.Provider>
  );
}
