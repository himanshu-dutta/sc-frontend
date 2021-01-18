import React, { useContext, useState } from "react";
import { ChatboxContext } from "../../Context/ChatboxContext";

const Landing = () => {
  const { createSocket, socket } = useContext(ChatboxContext);

  const [userForm, setUserForm] = useState({
    connectedUser: "",
  });

  const handleUser = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setUserForm({ ...userForm, [id]: value });
  };

  const processSocket = (e) => {
    e.preventDefault();
    createSocket(userForm.connectedUser);
    console.log(socket);
  };

  return (
    <>
      <form>
        <input
          type="text"
          id="connectedUser"
          placeholder="Username"
          value={userForm.connectedUser}
          onChange={handleUser}
        />
        <br />
        <button type="submit" onClick={processSocket}>
          Connect to User
        </button>
      </form>
    </>
  );
};

export default Landing;
