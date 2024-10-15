import styles from "./Navbar.module.scss";
import classNames from "classnames/bind";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {jwtDecode} from "jwt-decode"; //
import * as actionType from "../../../constants/actionTypes";
import { createSocket } from "../../../../actions/socket";
import { io } from "socket.io-client"; // sử dụng socket.io-client
import globe from "../../../../assets/globe.svg";
import logo from "../../../../assets/logo.png";

const cx = classNames.bind(styles);
function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const socket = useSelector((state) => state.socket?.socket); // Thêm dấu ? để tránh lỗi undefined

  // Khởi tạo socket nếu chưa có
  useEffect(() => {
    if (!socket) {
      const newSocket = io("http://localhost:5000"); // Khởi tạo socket
      console.log("Socket created:", newSocket);
      dispatch(createSocket(newSocket)); // Gửi socket vào Redux store
    }
  }, [socket, dispatch]);

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate("/auth");
    setUser(null);

    // Kiểm tra xem socket đã tồn tại chưa trước khi disconnect
    if (socket) {
      console.log("Disconnecting socket:", socket);
      socket.disconnect();
    }
  };

  useEffect(() => {
    const token = user?.accessToken;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <header>
      <nav className={cx('nav')}>
        <div className={cx("menu-right")}>
          <ul className={cx('nav__list')}>
            <li className={cx("nav__list-logo")}>
              <Link to="/" className={cx("logo-link")}>
                <img src={logo} alt="logo" className={cx("logo-img")} />
              </Link>
            </li>
            <li className={cx("nav__list-item")}>
              About
              <ul className={cx("nav__list-item-drop")}>
                <li>How it works</li>
                <li>Ways to play"</li>
              </ul>
            </li>
            <li className={cx("nav__list-item")}>
              Study
              <ul className={cx("nav__list-item-drop")}>
                <li>
                  <Link to="/quizes">Public quizes</Link>
                </li>
                <li>Test game</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className={cx("menu-left")}>
          <ul className={cx('nav__list')}>
            <li className={cx("nav__list-item")}>Contact</li>

            {user ? (
              <>
                <li className={cx("nav__list-item")}>
                  <Link to="/games/joingame">Play</Link>
                </li>
                {user.result.userType === "Teacher" && (
                  <li className={cx("nav__list-item")}>
                    <Link to="/myquizes">My Quizes</Link>
                  </li>
                )}
                <li className={cx("nav__list-item")}>
                  {user.result.firstName}
                </li>
                <li onClick={logout} className={cx("nav__list-item")}>
                  Log out
                </li>
              </>
            ) : (
              <Link to="/auth" className={cx("nav__list-item")}>
                Log in
              </Link>
            )}
            <li className={cx("nav__list-item")}>
              <img src={globe} alt="" />
              EN
              <ul className={cx("nav__list-item-drop")}></ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
