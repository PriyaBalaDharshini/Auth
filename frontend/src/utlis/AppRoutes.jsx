import Dashboard from "../components/Dashboard";
import Home from "../components/Home";
import Login from "../components/Login";
import Signin from "../components/Signin";
import { Navigate } from 'react-router-dom'

const AppRoutes = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/signin',
        element: <Signin />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/dashboard",
        element: <Dashboard />
    },
    {
        path: "/*",
        element: <Navigate to={"/"} />
    }
]

export default AppRoutes