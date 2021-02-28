import React, { useState } from "react";
import axios from "axios";

export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
    const [credentials, setCredentials] = useState({
        token: "",
        expiry: "",
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const loginUser = ({ username, password }) => {
        axios
            .post(`http://${process.env.REACT_APP_API_URL}/api/user/login/`, {
                username,
                password,
            })
            .then((response) => {
                console.log(response.data);
                if (response.status === 200) {
                    setIsLoggedIn(!isLoggedIn);
                    const { token, expiry } = response.data;
                    setCredentials({ token: token, expiry: expiry });
                }
            });
    };

    const registerUser = (registrationDetails) => {
        return axios
            .post(
                `http://${process.env.REACT_APP_API_URL}/api/user/register/`,
                registrationDetails
            )
            .then((response) => {
                if (response.status === 200) {
                    return true;
                }
                return false;
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const logoutUser = () => {
        const headers = {
            Authorization: `Token ${credentials.token}`,
        };

        (isLoggedIn &&
            axios
                .post(
                    `http://${process.env.REACT_APP_API_URL}/api/user/logout/`,
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
                registerUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
