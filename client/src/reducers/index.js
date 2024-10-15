import { combineReducers } from "redux";
import users from "./users";
import socket from "./socket";

export default combineReducers({
  users,
  socket
});
