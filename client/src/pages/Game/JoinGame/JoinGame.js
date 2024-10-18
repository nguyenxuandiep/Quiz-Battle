import React, { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { CircularProgress } from "@mui/material"
import { createPlayerResult } from "../../../actions/playerResult"
import { addPlayer } from "../../../actions/game"
import styles from "./joinGame.module.scss"


function JoinGame() {
  const user = JSON.parse(localStorage.getItem("profile"))
  const dispatch = useDispatch()
  const [isPlayerAdded, setIsPlayerAdded] = useState(false)
  const pinRef = useRef("")
  const navigate = useNavigate()
  const socket = useSelector((state) => state.socket.socket)

  useEffect(()=>{
    socket?.on("move-to-game-page", (gameId) => {
      dispatch(
        createPlayerResult({
          playerId: user.result._id,
          gameId: gameId,
          score: 0,
          answers: [],
        })
      )
      navigate(`/games/player/${gameId}`)
    })
  }, [socket, dispatch, navigate, user.result._id])

  const result = (message, playerId, gameId) => {
    if (message === "correct") {
      dispatch(addPlayer(gameId, playerId))
      setIsPlayerAdded(true)
    } else {
      alert("Podałeś zły pin lub gra nie istnieje")
    }
  }

  const joinGame = () => {
    socket.emit(
      "add-player",
      user.result,
      socket.id,
      pinRef.current.value,
      (message, playerId, gameId) => {
        result(message, playerId, gameId)
      }
    )
  }

  return (
    <div className={styles.page}>
      {!isPlayerAdded ? (
        <div className={styles.section}>
          <h2>Join game</h2>
          <input
            type="text"
            ref={pinRef}
            placeholder= 'Write here a pin'
          />
          <button onClick={joinGame}>
          Send
          </button>
        </div>
      ) : (
        <div className={styles.section}>
          <h2>
          You joined the game
          </h2>
          <h4>
          Waiting on a host to start the game
          </h4>
          <CircularProgress />
        </div>
      )}
    </div>
  )
}

export default JoinGame
