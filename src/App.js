// Context
import UserProvider from "./Context/UserContext";
import ChatboxProvider from "./Context/ChatboxContext";

// Components
import Landing from "./Components/Landing";
import Chatbox from "./Components/Chatbox";

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
        <br />
        <hr height={5} />
        <br />
        <ChatboxProvider>
          <Chatbox />
        </ChatboxProvider>
      </UserProvider>
    </div>
  );
}

export default App;
