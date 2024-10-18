import React from "react"
import styles from "./questionListItem.module.scss"
import defaultQuestionImage from "../../../assets/defaultQuestionImage.svg"
import classNames from "classnames/bind"


const cx = classNames.bind(styles);
function QuestionListItem({ number, type, name, time, image, onClick }) {
  return (
    <div className={cx("question-list-item")} onClick={onClick}>
      <h3 className={cx("question-list-item-title")}>
        <span className={cx("question-list-number")}>{number}&nbsp;</span>
        {type}
      </h3>
      <div className={cx("question-preview")}>
        <h4 className={cx("question-preview-title")}>
          {name}
        </h4>
        <div className={cx("question-preview-time")}>{time}</div>
        <div className={cx("question-preview-background-image")}>
          {image.length === 0 ? (
            <img src={defaultQuestionImage} alt="" />
          ) : (
            <img src={image} alt="" />
          )}
        </div>
        <div className={cx("question-preview-answers")}>
          <div className={cx("answer-image")}></div>
          <div className={cx("answer-image")}></div>
          <div className={cx("answer-image")}></div>
          <div className={cx("answer-image")}></div>
        </div>
      </div>
    </div>
  )
}

export default QuestionListItem
