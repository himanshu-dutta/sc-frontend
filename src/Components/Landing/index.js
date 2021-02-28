import { useState } from "react";
import Login from "./Login";
import Registration from "./Registration";

const Landing = () => {
    const [isLoginTab, setIsLoginTab] = useState(true);

    return (
        <>
            <button onClick={() => setIsLoginTab(true)}>Login</button>
            <button onClick={() => setIsLoginTab(false)}>Registration</button>
            {isLoginTab ? <Login /> : <Registration />}
        </>
    );
};

export default Landing;
