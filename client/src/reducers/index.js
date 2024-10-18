import { combineReducers } from "redux";
import users from "./users";
import socket from "./socket";
import auth from "./auth";
import quiz from "./quiz";
import games from "./games";
import playerResults from "./playerResults";
import leaderboards from "./leaderboards";

export default combineReducers({
  users,
  auth,
  quiz,
  games,
  playerResults,
  leaderboards,
  socket
});
