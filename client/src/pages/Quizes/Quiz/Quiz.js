import React from "react"
import { useDispatch } from "react-redux";
import styles from "./quiz.module.scss";
import { likeQuiz } from "../../../actions/quiz";
import { useNavigate } from "react-router-dom";
import moment from "moment"
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import classNames from "classnames/bind";


const cx = classNames.bind(styles);

function Quiz({ quiz }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("profile"))
  const openQuizDetailsPage = (e) => {
    navigate(`/quizes/${quiz._id}`)
  }
  const Likes = () => {
    if (quiz.likesCount.length > 0) {
      return quiz.likesCount.find((like) => like === user?.result?._id) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {quiz.likesCount.length > 2
            ? `You and ${quiz.likesCount.length - 1} others`
            : `${quiz.likesCount.length} like `}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{quiz.likesCount.length}{" "}
          {quiz.likesCount.length === 1
            ? "Like"
            : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    )
  }

  return (
    <div className={cx("quiz-card")}>
      <div className={cx("image-container")}>
        <h3 className={cx("quiz-creator")}>{quiz.creatorName}</h3>
        <h3 className={cx("quiz-date")}>
          {moment(quiz.dateCreated).fromNow()}
        </h3>
        <div
          onClick={openQuizDetailsPage}
          className={cx("quiz-image")}
          style={{ backgroundImage: "url('" + quiz.backgroundImage + "')" }}
        ></div>
        <h3 className={cx("quiz-question-number")}>
        Questions: {" "}
          {quiz.numberOfQuestions}
        </h3>
      </div>
      <div className={cx("card-body")}>
        <h4 className={cx("quiz-tags")}>
          {quiz.tags.map((tag) => `#${tag} `)}
        </h4>
        <h2 className={cx("quiz-title")}>{quiz.name}</h2>
        <p className={cx("quiz-description")}>{quiz.description}</p>
        <button
          className={cx("like-button")}
          onClick={() => dispatch(likeQuiz(quiz._id))}
        >
          <Likes />
        </button>
      </div>
    </div>
  )
}

export default Quiz;
