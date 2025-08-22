import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/login";
import Signup from "./views/Signup";
import Users from "./views/Users";
import NotFound from "./views/NotFound";
import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayout";
import Dashboard from "./views/Dashboard";

//un tableau d'objet
//definis les routes de l'application
//
//path: '*' | pour toutes les routes
//qui ne sont pas definis, il renvoie le component NotFound
//
//l'ordre des routes a son importance (si ils ont la meme routes)
//il prend le 1er
const router = createBrowserRouter([
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to='/users' />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    },
])

export default router;