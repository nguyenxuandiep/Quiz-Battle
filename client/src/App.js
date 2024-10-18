import io from "socket.io-client";
import { Fragment, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import { createSocket } from './actions/socket';
import { DefaultLayout } from "./components/Layout/";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io("http://localhost:3001"); // Đảm bảo sử dụng port đúng

    console.log("Socket created:", socket);
    dispatch(createSocket(socket)); // Gửi socket vào Redux store

    // Lắng nghe sự kiện connect
    socket.on("connect", () => {
      console.log("Connected to socket server:", socket.id);
    });

    // Lắng nghe sự kiện disconnect
    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    return () => {
      socket.disconnect(); // Ngắt kết nối khi component bị unmount
    };
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            // Nếu không có layout được setting thì mặc định là DefaultLayout
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
                    {/* Page này trở thành children nên sẽ được đưa vào DefaultLayout {children} */}
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
