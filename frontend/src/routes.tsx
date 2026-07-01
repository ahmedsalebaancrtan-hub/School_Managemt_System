import { createBrowserRouter } from 'react-router-dom'
import { Register } from './pages/authentication/register'
import { Login } from './pages/authentication/login'
import { Dashboard } from './pages/dashboard'


export const routes = createBrowserRouter([

    //. authenctication 

{
        path : "/auth",

    children : [
        {
          path : "register",
          element : <Register/>
        },
        {
            path : "login",
            element : <Login/>
        }
    ]
},

//./Dashboard 

{
    path : "/dashboard",
    element : <Dashboard/>
}

])