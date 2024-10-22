import React, { useEffect, useState } from "react";
import MyQuiz from "./MyQuiz/MyQuiz";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherQuizes, createQuiz } from "../../actions/quiz";
import styles from "./MyQuizes.module.scss"; // Đảm bảo rằng bạn đã định nghĩa các lớp ở đây
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

const cx = classNames.bind(styles); // Kết nối classNames với styles

function MyQuizes() {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lấy danh sách quizes từ Redux store
  const { quizes } = useSelector((state) => state.quiz);

  const [quizData, setQuizData] = useState({
    name: "",
    creatorName: `${user?.result.firstName} ${user?.result.lastName}`,
    backgroundImage: "",
    description: "",
    pointsPerQuestion: 1,
    isPublic: true,
    tags: [],
    questionList: [],
  });

  const [isQuizPublic, setIsQuizPublic] = useState(true);

  useEffect(() => {
    dispatch(getTeacherQuizes(user.result._id));
  }, [dispatch, user]);

  const handleQuizSubmit = () => {
    dispatch(createQuiz(quizData, navigate));
  };

  const handleQuizChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
  };

  return (
    <div className={cx("quizes-list")}> {/* Sử dụng cx để lấy lớp */}
      <div className={cx("quiz-settings")}>
        <h2>Create new quiz</h2>
        <div className={cx("quiz-form")}>
          <div className={cx("option-label")}>
            <label>Title</label>
          </div>
          <input
            value={quizData.name}
            type="text"
            name="name"
            onChange={handleQuizChange}
          />
          <div className={cx("option-label")}>
            <label>Description</label>
          </div>
          <input
            value={quizData.description}
            type="text"
            name="description"
            onChange={handleQuizChange}
          />
          <div className={cx("option-buttons")}>
            <button
              onClick={() => {
                setIsQuizPublic(true);
                setQuizData({ ...quizData, isPublic: true });
              }}
              className={cx("option-button")}
              style={{
                backgroundColor: isQuizPublic ? "rgb(19, 104, 206)" : "inherit",
                color: isQuizPublic ? "white" : "rgb(110, 110, 110)",
              }}
            >
              Public
            </button>
            <button
              onClick={() => {
                setIsQuizPublic(false);
                setQuizData({ ...quizData, isPublic: false });
              }}
              className={cx("option-button")}
              style={{
                backgroundColor: isQuizPublic ? "inherit" : "rgb(19, 104, 206)",
                color: isQuizPublic ? "rgb(110, 110, 110)" : "white",
              }}
            >
              Private
            </button>
          </div>
          <button
            onClick={handleQuizSubmit}
            className={cx("submit-button")}
          >
            Create new quiz
          </button>
        </div>
      </div>
      {quizes.map((quiz) => (
        <MyQuiz key={quiz._id} quiz={quiz} />
      ))}
    </div>
  );
}

export default MyQuizes;
