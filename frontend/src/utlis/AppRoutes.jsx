import Dashboard from "../components/Dashboard";
import ForgotPassword from "../components/ForgotPassword";
import Home from "../components/Home";
import Login from "../components/Login";
import Signin from "../components/Signin";
import { Navigate } from 'react-router-dom'
import UpdatePassword from "../components/UpdatePassword";


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
        path: "/forgotpassword",
        element: <ForgotPassword />
    },

    {
        path: "/updatepassword",
        element: <UpdatePassword />
    },
    {
        path: "/*",
        element: <Navigate to={"/"} />
    }
]

export default AppRoutes