import React, { useEffect } from "react"
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import moment from "moment"
import { useParams } from "react-router-dom"
import Quiz from "../Quizes"
import Question from "../QuizDetails/Question"
import CommentSection from './CommentSection/CommentSection'
import { getQuiz, getQuizesBySearch } from "../../actions/quiz"
import styles from "./QuizDetails.module.scss"
import classNames from "classnames/bind"


const cx = classNames.bind(styles);
const Post = () => {
  const { quiz, quizes, isLoading } = useSelector((state) => state.quiz)
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getQuiz(id))
  }, [id])

  useEffect(() => {
    if (quiz) {
      dispatch(
        getQuizesBySearch({ search: "none", tags: quiz?.tags.join(",") })
      )
    }
  }, [quiz])

  if (!quiz) return null

  if (isLoading) {
    return (
      <Paper elevation={6} className={cx('loadingPaper')}>
        <CircularProgress size="7em" />
      </Paper>
    )
  }

  const recommendedQuizes = quizes.filter(({ _id }) => _id !== quiz._id)

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={cx('card')}>
        <div className={cx('section')}>
          <Typography variant="h3" component="h2">
            {quiz.name}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {quiz.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {quiz.description}
          </Typography>
          <Typography variant="h6">
          Created by:
          </Typography>
          <Typography variant="body1">
            {moment(quiz.dateCreated).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection quiz={quiz} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={cx('imageSection')}>
          <img className={cx('media')} src={quiz.backgroundImage} alt="" />
        </div>
      </div>
      {quiz.questionList.length > 0 && (
        <div>
          <Typography gutterBottom variant="h5">
          Question list:
          </Typography>
          <Divider />
          {quiz.questionList.map((question) => (
            <Question key={question._id} question={question} />
          ))}
        </div>
      )}
      <Divider />
      {recommendedQuizes.length > 0 && (
        <div>
          <Typography gutterBottom variant="h5">
          You might also like:
          </Typography>
          <Divider />
          {recommendedQuizes.map((quiz) => (
            <Quiz key={quiz._id} quiz={quiz} />
          ))}
        </div>
      )}
    </Paper>
  )
}

export default Post
