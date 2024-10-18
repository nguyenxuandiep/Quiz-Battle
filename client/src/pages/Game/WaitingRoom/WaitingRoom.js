import React, { useState, useEffect } from "react"
import styles from "./waitingRoom.module.scss";
import classNames from "classnames/bind";


const cx = classNames.bind(styles);
function WaitingRoom({ pin, socket }) {
  const [playerList, setPlayerList] = useState([])

  useEffect(() => {
    socket.on("player-added", (player) => {
      setPlayerList([...playerList, player])
    })
  }, [playerList, socket])

  return (
    <div className={cx("waiting-room")}>
      <h1 className={cx("title")}>
      Waiting room
      </h1>
      <h2 className={cx("header")}>
      Show PIN to your students
        : {pin}
      </h2>
      <div className={cx("players-list")}>
        <div className={cx("leaderboard")}>
          <h1 className={cx("leaderboard-title")}>
          Player List
          </h1>
          {playerList.length > 0 ? (
            <ol>
              {playerList.map((player) => (
                <li>
                  <mark>{player.userName}</mark>
                  <small>Student</small>
                </li>
              ))}
            </ol>
          ) : (
            <h1 className={cx("leaderboard-title")}>
              No players yet
            </h1>
          )}
        </div>
      </div>
    </div>
  )
}

export default WaitingRoom
