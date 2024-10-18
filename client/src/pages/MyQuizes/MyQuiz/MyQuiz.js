import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./myQuiz.module.scss";
import { deleteQuiz } from "../../../actions/quiz";
import { createGame } from "../../../actions/game";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {  useNavigate } from "react-router-dom";
import { createLeaderboard } from "../../../actions/leaderboard";
import classNames from "classnames/bind";


function MyQuiz({ quiz }) {
  const cx = classNames.bind(styles)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const socket = useSelector((state) => state.socket.socket)
  const openQuizPage = (e) => {
    navigate(`/myquizes/${quiz._id}`)
  }

  const addGame = async () => {
    let gameData = {
      quizId: quiz._id,
      isLive: true,
      pin: String(Math.floor(Math.random() * 9000) + 1000),
    }
    const newGame = await dispatch(createGame(gameData, navigate))
    let leaderboardData = { gameId: newGame._id, playerResultList: [] }
    
    const newLeaderboard = await dispatch(createLeaderboard(leaderboardData))
    socket.emit("init-game", newGame, newLeaderboard)
  }

  return (
    <div className={cx("quiz-card")}>
      <div className={cx("image-container")}>
        <h3 className={cx("quiz-creator")}>{quiz.creatorName}</h3>
        <h3 className={cx("quiz-date")}>
          {moment(quiz.dateCreated).fromNow()}
        </h3>
        <div
          className={cx("quiz-image")}
          style={{ backgroundImage: "url('" + quiz.backgroundImage + "')" }}
        ></div>
        <h3 className={cx("quiz-question-number")}>
        Questions
          {quiz.numberOfQuestions}
        </h3>
      </div>
      <div className={cx("card-body")}>
        <div>
          <h4 className={cx("quiz-tags")}>
            {quiz.tags.map((tag) => `#${tag} `)}
          </h4>
          <div className={cx("card-buttons")}>
            <button onClick={addGame}>
            Start a game
            </button>
            <button onClick={openQuizPage}>
              <MoreHorizIcon fontSize="medium" />
            </button>
            <button onClick={() => dispatch(deleteQuiz(quiz._id))}>
              <DeleteIcon fontSize="small" />
              Delete
            </button>
          </div>
        </div>
        <h2 className={cx("quiz-title")}>{quiz.name}</h2>
        <p className={cx("quiz-description")}>{quiz.description}</p>
      </div>
    </div>
  )
}

export default MyQuiz
