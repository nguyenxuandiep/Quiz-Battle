import axios from "axios";

// Tạo một baseURL nhất quán cho API
const BASE_URL = "http://localhost:3001/api";

// Tạo instance cho API chính và cho AUTH API
const API = axios.create({ baseURL: BASE_URL });
const AUTH_API = axios.create({ baseURL: `${BASE_URL}/auth` });

// Interceptor để thêm token vào tất cả các request nếu có
API.interceptors.request.use((req) => {
  const profile = localStorage.getItem("profile");
  if (profile) {
    req.headers.Authorization = `Bearer ${JSON.parse(profile)?.accessToken}`;
  }
  return req;
}, (error) => {
  return Promise.reject(error);
});

// AUTH API không cần token khi login và register
AUTH_API.interceptors.request.use((req) => {
  const profile = localStorage.getItem("profile");
  if (profile) {
    req.headers.Authorization = `Bearer ${JSON.parse(profile)?.accessToken}`;
  }
  return req;
}, (error) => {
  return Promise.reject(error);
});

// AUTH actions
export const login = (formData) => AUTH_API.post("/login", formData);
export const register = (formData) => AUTH_API.post("/register", formData);

// User actions
export const fetchUsers = () => API.get("/users");
export const createUser = (newUser) => API.post("/users", newUser);
export const updateUser = (id, updatedUser) => API.patch(`/users/${id}`, updatedUser);
export const deleteUser = (id) => API.delete(`/users/${id}`);

// Quiz actions
export const fetchQuizes = () => API.get("/quizes");
export const fetchPublicQuizes = (page) => {
  console.log(`Fetching public quizzes from page: ${page}`);
  return API.get(`/quizes/public?page=${page}`);
};
export const fetchQuizesBySearch = (searchQuery) =>
  API.get(`/quizes/search?searchQuery=${searchQuery.search || "none"}&tags=${searchQuery.tags}`);
export const fetchTeacherQuizes = (teacherId) => API.get(`/quizes/teacher/${teacherId}`);
export const fetchQuestions = (quizId) => API.get(`/quizes/${quizId}`);
export const createQuiz = (newQuiz) => API.post("/quizes", newQuiz);
export const createQuestion = (quizId, newQuestion) => API.post(`/quizes/${quizId}/questions`, newQuestion);
export const updateQuestion = (quizId, questionId, updatedQuestion) =>
  API.patch(`/quizes/${quizId}/questions/${questionId}`, updatedQuestion);
export const updateQuiz = (id, updatedQuiz) => API.patch(`/quizes/${id}`, updatedQuiz);
export const deleteQuiz = (id) => API.delete(`/quizes/${id}`);
export const likeQuiz = (id) => API.patch(`/quizes/${id}/likeQuiz`);
export const commentQuiz = (comment, id) => API.post(`/quizes/${id}/commentQuiz`, { comment });
export const fetchQuiz = (id) => API.get(`/quizes/${id}`, id);

// Game actions
export const createGame = (newGame) => API.post("/games", newGame);
export const fetchGame = (id) => API.get(`/games/${id}`, id);
export const addPlayer = (gameId, playerId) => API.patch(`/games/${gameId}/players`, { playerId });

// Player Result actions
export const createPlayerResult = (newPlayerResult) => API.post("/playerResults", newPlayerResult);
export const fetchPlayerResult = (id) => API.get(`/playerResults/${id}`, id);
export const addAnswer = (newAnswer, id) => API.patch(`/playerResults/${id}/answers`, { newAnswer });

// Leaderboard actions
export const createLeaderboard = (newLeaderboard) => API.post("/leaderboard", newLeaderboard);
export const fetchLeaderboard = (id) => API.get(`/leaderboard/${id}`, id);
export const addPlayerResult = (playerResult, id) => API.patch(`/leaderboard/${id}/playerresult`, playerResult);
export const updateQuestionLeaderboard = (questionResult, id) =>
  API.patch(`/leaderboard/${id}/questionleaderboard`, questionResult);
export const updateCurrentLeaderboard = (result, id) =>
  API.patch(`/leaderboard/${id}/currentleaderboard`, result);
