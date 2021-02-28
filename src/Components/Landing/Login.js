import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";

const Login = () => {
    const { loginUser } = useContext(UserContext);

    const [userForm, setUserForm] = useState({
        username: "",
        password: "",
    });

    const handleUser = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setUserForm({ ...userForm, [id]: value });
    };

    const processLogin = (e) => {
        e.preventDefault();
        loginUser(userForm);
        setUserForm({
            username: "",
            password: "",
        });
    };

    return (
        <>
            <form>
                <input
                    type="text"
                    id="userRegistrationname"
                    placeholder="Username"
                    value={userForm.username}
                    onChange={handleUser}
                />
                <br />
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={userForm.password}
                    onChange={handleUser}
                    autoComplete="on"
                />
                <br />
                <button type="submit" onClick={processLogin}>
                    Login
                </button>
            </form>
        </>
    );
};

export default Login;
