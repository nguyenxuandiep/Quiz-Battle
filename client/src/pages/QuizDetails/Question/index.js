import React from "react"
import QuestionListItem from "../../QuizCreator/QuestionListItem/QuestionListItem"
import styles from "./question.module.scss"
import classNames from "classnames/bind"


const cx = classNames.bind(styles);
function Question({ question }) {
  console.log(question)
  return (
    <div className={cx("quiz-card")}>
      <div>
        <QuestionListItem
          key={question.questionIndex}
          number={question.questionIndex}
          type={question.questionType}
          time={question.answerTime}
          image={question.backgroundImage}
        />
      </div>
      <div className={cx("card-body")}>
        <p className={cx("quiz-description")}>{question.question}</p>
      </div>
    </div>
  )
}

export default Question
