import { useContext, useState } from "react";

import { UserContext } from "../../Context/UserContext";
import { parseRegistration } from "../../Utils/apiUtils";

const Registration = () => {
    const { registerUser } = useContext(UserContext);

    const [registrationForm, setRegistrationForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        dob: "",
        phone: "",
    });

    const [info, setInfo] = useState(null);

    const handleUser = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setRegistrationForm({ ...registrationForm, [id]: value });
    };

    const processRegistration = async (e) => {
        e.preventDefault();
        setInfo(null);
        let registrationDetails = null,
            isRegistered = false;

        try {
            registrationDetails = parseRegistration(registrationForm);
        } catch (e) {
            setInfo({
                message: e.message,
                type: 0,
            });
            return;
        }

        if (registrationDetails) {
            isRegistered = await registerUser(registrationDetails);
        }
        if (isRegistered) {
            setInfo({
                message: "User registration successful.",
                type: 1,
            });
            return;
        }
        setInfo({
            message: "User registration unsuccessful.",
            type: 0,
        });
    };

    return (
        <>
            {info &&
                (info.type ? (
                    <div style={{ backgroundColor: "green" }}>
                        {info.message}
                    </div>
                ) : (
                    <div style={{ backgroundColor: "red" }}>{info.message}</div>
                ))}
            <form>
                <input
                    type="text"
                    id="firstName"
                    placeholder="First Name"
                    value={registrationForm.firstName}
                    onChange={handleUser}
                />
                <input
                    type="text"
                    id="lastName"
                    placeholder="Last Name"
                    value={registrationForm.lastName}
                    onChange={handleUser}
                />
                <br />
                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={registrationForm.username}
                    onChange={handleUser}
                />
                <br />
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={registrationForm.email}
                    onChange={handleUser}
                />
                <br />
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={registrationForm.password}
                    onChange={handleUser}
                    autoComplete="on"
                />
                <br />
                <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={registrationForm.confirmPassword}
                    onChange={handleUser}
                    autoComplete="on"
                />
                <br />

                <input
                    type="date"
                    id="dob"
                    placeholder="Date Of Birth"
                    value={registrationForm.dob}
                    onChange={handleUser}
                />
                <br />

                <input
                    type="tel"
                    id="phone"
                    placeholder="Phone/Mobile"
                    value={registrationForm.phone}
                    onChange={handleUser}
                />
                <br />
                <br />
                <button type="submit" onClick={processRegistration}>
                    Register
                </button>
            </form>
        </>
    );
};

export default Registration;
