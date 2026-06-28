import axios from "axios";


export const api = axios.create({
    baseURL : 'http://localhost:8000/api',

})

export const DEFUALT_ERROR_MESSEGE = "something went wrong. please try again later"