import { api, DEFUALT_ERROR_MESSEGE } from "@/lib/api";
import type { IuserLoginRequest, IuserLoginResponse, User } from "@/types/user";
import { AxiosError } from "axios";
import { create } from "zustand";


interface IUserStore{
    isLoading : boolean,
    error : string,
    user: User,
    accessToken : string,
    refreshToken: string,
    loginUser : (data : IuserLoginRequest) => void
}


export const useUserStore = create<IUserStore>((set)=> (
    {
        isLoading : false,
        error : "",
        user : {} as User,
        accessToken :  "",
        refreshToken : "",
        async  loginUser(reqdata){
      try {
        
              // 1. set is Loading true 
            set({
                isLoading : true,
                error : ""
            })

            //2. call the Backend 
            const response = await api.post("/users/Login", reqdata)
            const data : IuserLoginResponse = response.data

            if(!data.is_sucess){
                set({
                    isLoading: false,
                    error : data.messege
                })
                return 

            }
            // Store the State 

            set({
                isLoading : false,
                accessToken : data.data.Access_token,
                refreshToken : data.data.Refresh_token,
                user : data.data.User
            })
      } catch (error) {
        if(error instanceof AxiosError) {
            set({
                isLoading : false,
                error : error.message || DEFUALT_ERROR_MESSEGE,
            })
        }
        
      }


        }
        
    }
))