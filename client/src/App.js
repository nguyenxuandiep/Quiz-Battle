import io from "socket.io-client";
import { Fragment, useEffect, useState } from "react";
import axios, { isCancel, AxiosError } from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import { DefaultLayout } from "./components/Layout/";
const socket = io.connect("http://localhost:3001");

function App() {
  // Room State
  const [room, setRoom] = useState("");

  //Messaes States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };
  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            // Nếu k có layout đc setting thì mặc định  là  DefaultLayout lưu vào biến Layout
            const Page = route.component;
            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    {/* Page này trở thành children nên sẽ đc đưa vào DefaultLayout {children} */}
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
        <h1>React App</h1>
        <input
          placeholder="Room Number..."
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />

        <button onClick={joinRoom}>Join Room</button>
        <input
          placeholder="Message..."
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button onClick={sendMessage}>Send Message</button>
        <h1>Message:</h1>
        {messageReceived}
      </div>
    </Router>
  );
}

export default App;
