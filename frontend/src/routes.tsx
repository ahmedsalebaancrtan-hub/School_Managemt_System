import { createBrowserRouter } from 'react-router-dom'
import { Register } from './pages/authentication/register'
import { Login } from './pages/authentication/login'
import { Dashboard } from './pages/dashboard'
import { ListClasses } from './pages/dashboard/classes/list-classes'
import CreateClass from './pages/dashboard/classes/create-class'
import ViewClass from './pages/dashboard/classes/view-class'
import UpdateClass from './pages/dashboard/classes/update-class'
import { ListFamily } from './pages/dashboard/family/listfamily'
import CreateFamily from './pages/dashboard/family/create-family'
import ListStudent from './pages/dashboard/students/list-student'
import CreateSTudent from './pages/dashboard/students/create-student'



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
           },
           {
            path : "classes/update/:id",
            element : <UpdateClass/>
           },
           {
            path : "classes/:id",
            element : <ViewClass/>
           },
           {
            path : "family",
            element : <ListFamily/>
           },
           {
            path : "family/create",
            element : <CreateFamily/>
           },
           {
            path : "students",
            element : <ListStudent/>
           },
           {
            path : "students/create-student",
            element : <CreateSTudent/>
           }
    ]
}

])