import { useUserStore } from "@/store/user.store";
import axios from "axios";


export const api = axios.create({
    baseURL : 'http://localhost:8000/api',

})

export const DEFUALT_ERROR_MESSEGE = "something went wrong. please try again later"

api.interceptors.request.use(
  (config) => {
    const token = useUserStore.getState().accessToken

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)