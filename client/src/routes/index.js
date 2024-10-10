import Home from "../pages/Home";
import CreateQuiz from "../pages/CreateQuiz";
import Play from "../pages/Play";

// Public routes
const publicRoutes = [
    {path: '/', component: Home},
    {path: '/createquiz', component: CreateQuiz  },
    {path: '/play', component: Play, layout: null  },
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes}