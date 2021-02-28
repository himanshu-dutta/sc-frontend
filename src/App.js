// Context
import UserProvider from "./Context/UserContext";

// Components
import Landing from "./Components/Landing";

function App() {
    return (
        <div
            className="App"
            style={{
                maxWidth: "500px",
                margin: "auto",
                marginTop: "50px",
            }}
        >
            <UserProvider>
                <Landing />
            </UserProvider>
        </div>
    );
}

export default App;
