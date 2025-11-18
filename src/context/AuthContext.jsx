import { getProfile, loginapi, logoutapi } from "@/API/Interceptor";
import { createContext, useContext, useEffect, useState } from "react";


//  create context
const authContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [logoutmsg, setlogoutMsg] = useState(null);

  const getUserProfile = async () => {
    try {
      const userName = await getProfile();
      setUser(userName);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, [logoutmsg]);

  const login = async (formdata) => {
    try {
      const result = await loginapi(formdata);
      setUser(result.name);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      const result = await logoutapi();
      setlogoutMsg(result);
    } catch (err) {
      console.log(err);
    }
  };

  const data = {
    user,
    setUser,
    login,
    logout,
    logoutmsg,
    isAuthenication: !!user,
  };

  return <authContext.Provider value={data}>{children}</authContext.Provider>;
};

export const useUser = () => useContext(authContext);