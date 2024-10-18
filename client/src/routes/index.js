import Home from "../pages/Home";
import CreateQuiz from "../pages/MyQuizes";
import Auth from "../components/Auth/Auth";
import MyQuizes from "../pages/MyQuizes";
import Quizes from "../pages/Quizes";
import QuizDetails from '../pages/QuizDetails';
import QuizCreator from '../pages/QuizCreator';
import Pagination from '../pages/Pagination';
import { HostScreen, JoinGame, PlayerScreen, WaitingRoom, Answer } from '../pages/Game';


// Public routes
const publicRoutes = [
    {path: '/', component: Home},
    {path: '/createquiz', component: CreateQuiz  },
    {path: '/auth', component: Auth},
    {path: '/quiz', component: MyQuizes },
    {path: '/quizes', component: Quizes , layout: null },
    { path: "/quizes/search", component: Quizes , layout: null },
    { path: "/quizes/:id", component: QuizDetails , layout: null  },
    { path: "/myquizes/:id", component: QuizCreator , layout: null },
    { path: "/games/joingame", component: JoinGame , layout: null },
    { path: "/games/host/:id", component: HostScreen , layout: null },
    { path: "/games/player/:id", component: PlayerScreen , layout: null },
    { path: "/myquizes", component: MyQuizes },
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes}