import React from "react"
import styles from "./answerInput.module.scss"
import answerCheck from "../../../assets/answerCheck.svg"
import classNames from "classnames/bind"

const cx = classNames.bind(styles);

function AnswerInput({ value, onChange, onClick, isAnswerCorrect, svg, name }) {

  return (
    <>
      <img className={cx("answer-icon")} src={svg} alt="" />
      <input type="text" value={value} onChange={onChange} name={name} />
      <div onClick={onClick} className={cx("answer-check")}>
        <img
          style={{ visibility: isAnswerCorrect ? "visible" : "hidden" }}
          src={answerCheck}
          alt=""
        />
      </div>
    </>
  )
}

export default AnswerInput
