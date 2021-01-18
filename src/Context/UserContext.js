import React, { useState } from "react";
import axios from "axios";

export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [credentials, setCredentials] = useState({
    token: "",
    expiry: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const loginUser = ({ username, password }) => {
    axios
      .post(`http://${process.env.REACT_APP_API_URL}/api/login/`, {
        username,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(!isLoggedIn);
          const { token, expiry } = response.data;
          setCredentials({ token: token, expiry: expiry });
        }
      });
    setUser({
      username: "",
      password: "",
    });
  };

  const logoutUser = () => {
    const headers = {
      Authorization: `Token ${credentials.token}`,
    };

    (isLoggedIn &&
      axios
        .post(
          `http://${process.env.REACT_APP_API_URL}/api/logout/`,
          {},
          {
            headers,
          }
        )
        .then((response) => {
          console.log(response.status);
        })) ||
      console.log("User isn't logged in.");
  };

  return (
    <UserContext.Provider
      value={{
        credentials,
        isLoggedIn,
        loginUser,
        logoutUser,
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
