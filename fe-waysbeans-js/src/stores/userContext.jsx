import { createContext, useReducer } from "react";
import setAuthToken from "../libs/setAuthToken";

export const UserContext = createContext();

const user_state = {
  isLogin: false,
  user: {},
};

const user_Reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "AUTH_LOGIN":
      localStorage.setItem("token", payload.token);
      setAuthToken(payload.token);

      return {
        isLogin: true,
        user: payload,
      };

    case "AUTH_CHECK":
      return {
        isLogin: true,
        user: payload,
      };

    case "AUTH_ERROR":
      localStorage.removeItem("token");

      return {
        isLogin: false,
        user: {},
      };

    case "LOGOUT":
      localStorage.removeItem("token");

      return {
        isLogin: false,
        user: {},
      };

    default:
      throw new Error();
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(user_Reducer, user_state);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
