import React, { useState, useEffect } from "react";
import styles from "./quizCreator.module.scss";
import QuestionListItem from "./QuestionListItem/QuestionListItem";
import AnswerInput from "./AnswerInput/AnswerInput";
import triangle from "../../assets/triangle.svg";
import diamond from "../../assets/diamond.svg";
import circle from "../../assets/circle.svg";
import square from "../../assets/square.svg";
import questionType from "../../assets/questionType.svg";
import timer from "../../assets/timer.svg";
import gamePoints from "../../assets/gamePoints.svg";
import answerOptions from "../../assets/answerOptions.svg";
import { useDispatch, useSelector } from "react-redux";
import { updateQuiz, getQuiz } from "../../actions/quiz";
import FileBase from "react-file-base64";
import { useParams, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
function QuizCreator() {
  const user = JSON.parse(localStorage.getItem("profile"));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [quizData, setQuizData] = useState({
    name: "",
    creatorName: `${user?.result.firstName} ${user?.result.lastName}`,
    backgroundImage: "",
    description: "",
    pointsPerQuestion: 1,
    numberOfQuestions: 0,
    isPublic: true,
    tags: [],
    questionList: [],
  });

  const [questionData, setQuestionData] = useState({
    questionType: "Quiz",
    pointType: "Standard",
    answerTime: 5,
    backgroundImage: "",
    question: "",
    answerList: [
      { name: "a", body: "", isCorrect: false },
      { name: "b", body: "", isCorrect: false },
      { name: "c", body: "", isCorrect: false },
      { name: "d", body: "", isCorrect: false },
    ],
    questionIndex: 1,
  });

  useEffect(() => {
    dispatch(getQuiz(id));
  }, [id]);

  const { quiz } = useSelector((state) => state.quiz);

  useEffect(() => {
    if (quiz) {
      setQuizData(quiz);
    }
  }, [quiz]);

  const [isQuizOptionsVisible, setIsQuizOptionsVisible] = useState(false);
  const [isQuizPublic, setIsQuizPublic] = useState(true);
  const [isQuestionDataSave, setIsQuestionDataSave] = useState(false);
  const [questionImage, setQuestionImage] = useState("");
  const [quizImage, setQuizImage] = useState("");

  const showQuizOptions = () => {
    setIsQuizOptionsVisible(
      (prevIsQuizOptionsVisible) => !prevIsQuizOptionsVisible
    );
  };

  const setCorrectAnswer = (index) => {
    setQuestionData((prevState) => ({
      ...prevState,
      answerList: [
        ...prevState.answerList.slice(0, index),
        {
          name: prevState.answerList[index].name,
          body: prevState.answerList[index].body,
          isCorrect: !prevState.answerList[index].isCorrect,
        },
        ...prevState.answerList.slice(index + 1, prevState.answerList.length),
      ],
    }));

    questionData.answerList[index].isCorrect
      ? setCorrectAnswerCount((prevState) => prevState - 1)
      : setCorrectAnswerCount((prevState) => prevState + 1);
  };

  const handleQuizSubmit = (e) => {
    dispatch(updateQuiz(quiz._id, quizData));
    navigate(`/myquizes`);
  };

  const handleQuizChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
  };

  const updateAnswer = (name, body, index) => {
    setQuestionData((prevState) => ({
      ...prevState,
      answerList: [
        ...prevState.answerList.slice(0, index),
        {
          name: name,
          body: body,
          isCorrect: prevState.answerList[index].isCorrect,
        },
        ...prevState.answerList.slice(index + 1, prevState.answerList.length),
      ],
    }));
  };

  const validateAnswerFields = () => {
    return questionData.answerList.every((answer) => answer.body !== "");
  };

  const validateCorrectAnswer = () => {
    return questionData.answerList.some((answer) => answer.isCorrect === true);
  };

  const handleQuestionSubmit = () => {
    if (questionData.question === "") {
      alert("Wpisz treść pytania");
    } else if (!validateAnswerFields()) {
      alert("Wpisz treść odpowiedzi");
    } else if (!validateCorrectAnswer()) {
      alert("Wybierz poprawną odpowiedź");
    } else {
      setIsQuestionDataSave(true);
      // if true it means question already exist and is only updated
      if (
        quizData.questionList.filter(
          (question) => question.questionIndex === questionData.questionIndex
        )
      ) {
        //update list of questions in quizData
        setQuizData((prevState) => ({
          ...prevState,
          questionList: [
            ...prevState.questionList.slice(0, questionData.questionIndex - 1),
            questionData,
            ...prevState.questionList.slice(
              questionData.questionIndex,
              prevState.questionList.length
            ),
          ],
        }));
      } else {
        //question don't exist - add new one
        setQuizData({
          ...quizData,
          questionList: [...quizData.questionList, questionData],
        });
      }
    }
  };

  const handleQuestionRemove = () => {
    let index = questionData.questionIndex;
    setQuizData((prevState) => ({
      ...prevState,
      questionList: [
        ...prevState.questionList.slice(0, index - 1),
        ...prevState.questionList.slice(index, prevState.questionList.length),
      ],
    }));
    //update indexes
    quizData.questionList.forEach((question) => {
      if (question.questionIndex > index) {
        question.questionIndex -= 1;
      }
    });
    //display previous question or new first one if first was deleted
    if (quizData.questionList.length > 1 && index > 1) {
      showQuestion(index - 1);
    } else if (quizData.questionList.length > 1 && index === 1) {
      showQuestion(1);
    } else {
      clear();
    }
    setCorrectAnswerCount(0);
  };

  const clear = () => {
    setQuestionData({
      questionType: "Quiz",
      pointType: "Standard",
      answerTime: 5,
      backgroundImage: "",
      question: "",
      answerList: [
        { name: "a", body: "", isCorrect: false },
        { name: "b", body: "", isCorrect: false },
        { name: "c", body: "", isCorrect: false },
        { name: "d", body: "", isCorrect: false },
      ],
      questionIndex: quizData.questionList.length + 1,
    });
    setQuestionImage("");
  };

  const addNewQuestion = () => {
    setIsQuestionDataSave(false);
    clear();
    setIsQuestionTrueFalse(false);
    setCorrectAnswerCount(0);
  };

  const handleQuestionChange = (e) => {
    setQuestionData({ ...questionData, [e.target.name]: e.target.value });
  };

  const showQuestion = (index) => {
    var question = quizData.questionList.find(
      (question) => question.questionIndex === index
    );
    setQuestionData(question);
    setQuestionImage(question.backgroundImage);
    question.questionType === "True/False"
      ? setIsQuestionTrueFalse(true)
      : setIsQuestionTrueFalse(false);
  };

  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [maxCorrectAnswerCount, setMaxCorrectAnswerCount] = useState(1);

  const changeMaxCorrectAnswerCount = (e) => {
    setMaxCorrectAnswerCount(e.target.value);
    questionData.answerList.forEach((answer) => (answer.isCorrect = false));
    setCorrectAnswerCount(0);
  };

  const [isQuestionTrueFalse, setIsQuestionTrueFalse] = useState(false);
  const changeQuestionType = () => {
    setIsQuestionTrueFalse((prevState) => !prevState);
    if (!isQuestionTrueFalse) {
      questionData.answerList.splice(2, 2);
    } else {
      questionData.answerList.push({ name: "c", body: "", isCorrect: false });
      questionData.answerList.push({ name: "d", body: "", isCorrect: false });
    }
    questionData.answerList[0].body = "True";
    questionData.answerList[1].body = "False";
    setMaxCorrectAnswerCount(1);
    questionData.answerList.forEach((answer) => (answer.isCorrect = false));
    setCorrectAnswerCount(0);
  };

  if (user === null) {
    return <h1>Zaloguj się na konto nauczyciela, aby stworzyć quiz</h1>;
  } else if (user.result.userType !== "Teacher") {
    return <h1>Quizy mogą tworzyć jedynie nauczyciele</h1>;
  }

  return (
    <section className={cx("section")}>
      <div className={cx("question-list")}>
        <div className={cx("quiz-info")}>
          <h1>
            {quizData.name.length > 0
              ? quizData.name.length > 8
                ? quizData.name.substring(0, 8) + "..."
                : quizData.name
              : "Set quiz name"}
          </h1>
          <button className={cx("quiz-info-button")} onClick={showQuizOptions}>
            Settings
          </button>
        </div>
        <div className={cx("question-list-container")}>
          {quizData.questionList.length > 0 &&
            quizData.questionList.map((question) => (
              <QuestionListItem
                onClick={() => showQuestion(question.questionIndex)}
                key={question.questionIndex}
                number={question.questionIndex}
                type={question.questionType}
                name={question.question}
                time={question.answerTime}
                image={question.backgroundImage}
              />
            ))}

          <button
            onClick={() => {
              isQuestionDataSave
                ? addNewQuestion()
                : alert("Save changes in question data first");
            }}
            className={cx("add-question-button")}
          >
            Add question{" "}
          </button>
        </div>
      </div>
      <div className={cx("question-creator")}>
        <input
          type="text"
          name="question"
          value={questionData.question}
          onChange={handleQuestionChange}
          placeholder="Write your question here"
          className={cx("question-name")}
        />
        <div className={cx("image-container")}>
          <h3>Find and upload an image</h3>
          <div>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => {
                setQuestionData({ ...questionData, backgroundImage: base64 });
                setQuestionImage(base64);
              }}
            />
          </div>
          {questionImage && <img src={questionImage} alt="" />}
        </div>
        <div className={cx("answers-container")}>
          <div className={cx("answer-field")}>
            <AnswerInput
              value={questionData.answerList[0].body}
              name={"a"}
              onChange={(e) => {
                isQuestionTrueFalse
                  ? updateAnswer(e.target.name, "True", 0)
                  : updateAnswer(e.target.name, e.target.value, 0);
              }}
              onClick={() => {
                correctAnswerCount < maxCorrectAnswerCount ||
                questionData.answerList[0].isCorrect
                  ? setCorrectAnswer(0)
                  : alert("You already choose the correct answer");
              }}
              isAnswerCorrect={questionData.answerList[0].isCorrect}
              svg={triangle}
            />
          </div>
          <div className={cx("answer-field")}>
            <AnswerInput
              value={questionData.answerList[1].body}
              name={"b"}
              onChange={(e) => {
                isQuestionTrueFalse
                  ? updateAnswer(e.target.name, "False", 1)
                  : updateAnswer(e.target.name, e.target.value, 1);
              }}
              onClick={() => {
                correctAnswerCount < maxCorrectAnswerCount ||
                questionData.answerList[1].isCorrect
                  ? setCorrectAnswer(1)
                  : alert("You already choose the correct answer");
              }}
              isAnswerCorrect={questionData.answerList[1].isCorrect}
              svg={diamond}
            />
          </div>
          {!isQuestionTrueFalse && (
            <>
              <div className={cx("answer-field")}>
                <AnswerInput
                  value={questionData.answerList[2].body}
                  name={"c"}
                  onChange={(e) =>
                    updateAnswer(e.target.name, e.target.value, 2)
                  }
                  onClick={() => {
                    correctAnswerCount < maxCorrectAnswerCount ||
                    questionData.answerList[2].isCorrect
                      ? setCorrectAnswer(2)
                      : alert("You already choose the correct answer");
                  }}
                  isAnswerCorrect={questionData.answerList[2].isCorrect}
                  svg={circle}
                />
              </div>
              <div className={cx("answer-field")}>
                <AnswerInput
                  value={questionData.answerList[3].body}
                  name={"d"}
                  onChange={(e) =>
                    updateAnswer(e.target.name, e.target.value, 3)
                  }
                  onClick={() => {
                    correctAnswerCount < maxCorrectAnswerCount ||
                    questionData.answerList[3].isCorrect
                      ? setCorrectAnswer(3)
                      : alert("You already choose the correct answer");
                  }}
                  isAnswerCorrect={questionData.answerList[3].isCorrect}
                  svg={square}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className={cx("options")}>
        <div
          style={{ display: isQuizOptionsVisible ? "block" : "none" }}
          className={cx("question-options")}
        >
          <h1>Quiz</h1>
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
          <div className={cx("option-label")}>
            <label>Points per question</label>
          </div>
          <input
            type="number"
            min={1}
            value={quizData.pointsPerQuestion}
            name="pointsPerQuestion"
            onChange={handleQuizChange}
          />
          <div className={cx("option-label")}>
            <label>Access</label>
          </div>
          <div>
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
          <div className={cx("option-label")}>
            <label>Background Image</label>
          </div>
          <div>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => {
                setQuizData({ ...quizData, backgroundImage: base64 });
                setQuizImage(base64);
              }}
            />
          </div>
          {quizImage && (
            <img className={cx("quiz-image")} src={quizImage} alt="" />
          )}
          <div className={cx("option-label")}>
            <label>Tags comma separated</label>
          </div>
          <input
            type="text"
            value={quizData.tags}
            name="tags"
            onChange={(e) =>
              setQuizData({ ...quizData, tags: e.target.value.split(",") })
            }
          />
          <div>
            <button className={cx("option-button")} onClick={handleQuizSubmit}>
              Submit
            </button>
          </div>
        </div>
        <div
          style={{ display: isQuizOptionsVisible ? "none" : "block" }}
          className={cx("question-options")}
        >
          <div className={cx("option")}>
            <div className={cx("option-label")}>
              <img src={questionType} alt="" />
              <label>Question type</label>
            </div>
            <select
              onChange={(e) => {
                handleQuestionChange(e);
                changeQuestionType();
              }}
              name="questionType"
              value={questionData.questionType}
            >
              <option defaultValue disabled>
                Select question type
              </option>
              <option value="Quiz">Quiz</option>
              <option value="True/False">True/False</option>
            </select>
          </div>
          <div className={cx("option")}>
            <div className={cx("option-label")}>
              <img src={timer} alt="" />
              <label>Time limit</label>
            </div>
            <select
              onChange={handleQuestionChange}
              name="answerTime"
              value={questionData.answerTime}
            >
              <option defaultValue disabled>
                Set time limit
              </option>
              <option value={5}>5 seconds</option>
              <option value={10}>10 seconds</option>
              <option value={20}>20 seconds</option>
              <option value={30}>30 seconds</option>
              <option value={60}>1 minute</option>
              <option value={90}>1,5 minute</option>
            </select>
          </div>
          <div className={cx("option")}>
            <div className={cx("option-label")}>
              <img src={gamePoints} alt="" />
              <label>Points</label>
            </div>
            <select
              onChange={handleQuestionChange}
              name="pointType"
              value={questionData.pointType}
            >
              <option defaultValue disabled>
                Set points type
              </option>
              <option value="Standard">Standard</option>
              <option value="Double">Double</option>
              <option value="BasedOnTime">Based on Time</option>
            </select>
          </div>
          <div className={cx("option")}>
            <div className={cx("option-label")}>
              <img src={answerOptions} alt="" />
              <label>Answer options</label>
            </div>
            <select onChange={changeMaxCorrectAnswerCount}>
              <option defaultValue disabled value="1">
                Set answer options
              </option>
              <option value="1">Single choice</option>
              <option value="4">Multiple choice</option>
            </select>
          </div>
          <div>
            <button
              onClick={handleQuestionSubmit}
              className={cx("option-button")}
            >
              Save changes
            </button>
            <button
              onClick={handleQuestionRemove}
              className={cx("option-button")}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QuizCreator;
