import { createBrowserRouter } from 'react-router-dom'
import { Register } from './pages/authentication/register'
import { Login } from './pages/authentication/login'
import { Dashboard } from './pages/dashboard'
import { ListClasses } from './pages/dashboard/classes/list-classes'
import CreateClass from './pages/dashboard/classes/create-class'


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
    path : "dashboard",
    element : <Dashboard/>,
    children : [
           {
            index: true,
            element: <div>Dashboard Overview</div>
           },
           {
            path : "classes",
            element : <ListClasses/>
           },
           {
            path : "classes/create",
            element : <CreateClass/>
           }
    ]
}

])