import { createContext, useState } from "react";
const AuthContext = createContext({
  user: {
    name: "",
    email: "",
    image: "",
  },
  authReady: false,
});
export function AuthContextProvider({ children }) {
  const [activeUser, SetactiveUser] = useState({
    name: "",
    email: "",
    image: "",
  });
  const context = { activeUser, SetactiveUser };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}
export default AuthContext;
