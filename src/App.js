import { io } from "socket.io-client";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import userContext from "./contexts/userContext";

const socket = io("http://localhost:3333");

socket.on("connect-msg", (msg) => console.log(msg));
socket.on("new-user", (msg) => console.log(msg));

function App() {
  const { state, dispatch } = useContext(userContext);
  const [stream, setStream] = useState(null);
  const ref = useRef();
  const { users } = state;

  useEffect(() => {
    const userName = prompt("Enter your username");
    socket.emit("user-name", userName);

    async function loadStream() {
      const stream = await getStream();
      let audio = new Audio();
      audio.srcObject = stream;
      audio.play();
      // setStream(stream);
    }
    loadStream();
  }, []);

  return (
    <div className="App">
      {users.map(({ name, id, stream }, i) => (
        <>
          <h1 key={i}>{name}</h1>
        </>
      ))}
      <audio srcobject={stream} autoPlay playsInline />
    </div>
  );

  async function getStream() {
    return await navigator.mediaDevices.getUserMedia({ audio: true });
  }
}

export default App;
