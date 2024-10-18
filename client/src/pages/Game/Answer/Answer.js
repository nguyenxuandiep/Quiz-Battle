import React from 'react'
import styles from "./answer.module.scss"
import answerCheck from "../../../assets/answerCheck.svg";
import classNames from 'classnames/bind'


const cx = classNames.bind(styles);
function Answer({icon, body, showText, isAnswerClicked, onClick}) {
  return (
    <div className={cx("answer-field")}>
      <img className={cx("answer-icon")} src={icon} alt="" />
      {showText ? (
        <h2>{body}</h2>
      ) : (
        <div onClick={onClick} className={cx("answer-check")}>
          <img
            style={{ visibility: isAnswerClicked ? "visible" : "hidden" }}
            src={answerCheck}
            alt=""
          />
        </div>
      )}
    </div>
  )
}

export default Answer