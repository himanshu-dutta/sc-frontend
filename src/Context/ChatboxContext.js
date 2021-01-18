import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { w3cwebsocket as W3CWebSocket } from "websocket";

export const ChatboxContext = React.createContext();

const ChatboxProvider = ({ children }) => {
  const [socket, setSocket] = useState({
    ws: null,
  });

  const { credentials } = useContext(UserContext);

  const createSocket = (username) => {
    setSocket({
      ws: new W3CWebSocket(
        `ws://${process.env.REACT_APP_API_URL}/conversation/${username}/?token=${credentials.token}`
      ),
    });
  };

  return (
    <ChatboxContext.Provider
      value={{
        createSocket,
        socket,
      }}
    >
      {children}
    </ChatboxContext.Provider>
  );
};

export default ChatboxProvider;
