import { createContext, useEffect, useReducer } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3333");

const userContext = createContext({});
export default userContext;

const UPDATE_USER_LIST = "UPDATE_USER_LIST";

export function UserProvider({ children }) {
  const initState = { users: [] };
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    socket.on("new-user", (users) => {
      dispatch({ type: UPDATE_USER_LIST, payload: users });
    });
  }, []);

  return (
    <userContext.Provider value={{ state, dispatch }}>
      {children}
    </userContext.Provider>
  );
}

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_USER_LIST:
      return { ...state, users: payload };
    default:
      return { ...state };
  }
}
