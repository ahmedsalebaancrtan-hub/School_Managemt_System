import { api, DEFUALT_ERROR_MESSEGE } from "@/lib/api";
import type {
  IuserLoginRequest,
  IuserLoginResponse,
  IWhoami,
  User,
} from "@/types/user";
import { AxiosError } from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUserStore {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string;

  user: User;
  accessToken: string;
  refreshToken: string;

  loginUser: (data: IuserLoginRequest) => Promise<void>;
  WhoAmI?: () => Promise<void>;
}

export const useUserStore = create<IUserStore>()(
  persist(
    (set) => ({
      isLoading: false,
      isSuccess: false,
      isError: false,
      error: "",

      user: {} as User,

      accessToken: "",
      refreshToken: "",

      loginUser: async (reqData) => {
        set({
          isLoading: true,
          isSuccess: false,
          isError: false,
          error: "",
        });

        try {
          const response = await api.post("/users/Login", reqData);

          const data: IuserLoginResponse = response.data;

          if (!data.is_sucess) {
            set({
              isLoading: false,
              isSuccess: false,
              isError: true,
              error: data.messege,
            });

            return;
          }

          set({
            isLoading: false,
            isSuccess: true,
            isError: false,
            error: "",

            accessToken: data.data.Access_token,
            refreshToken: data.data.Refresh_token,
            user: data.data.User,
          });
        } catch (error) {
          let message = DEFUALT_ERROR_MESSEGE;

          if (error instanceof AxiosError) {
            message =
              error.response?.data?.messege ||
              error.response?.data?.message ||
              "Email or password is incorrect";
          }

          set({
            isLoading: false,
            isSuccess: false,
            isError: true,
            error: message,
          });
        }
      },
      // to get the user data from the access token
    async WhoAmI() {
      
try {
   set({
          isLoading: true,
          isSuccess: false,
          isError: false,
          error: "",
        })

        const response = await  api.get("/users/whoami", );
        const data : IWhoami  = response.data

        set({
           isLoading: false,
          isSuccess: true,
          isError: false,
          user : data?.data?.User

        })
  
} catch (error) {
  let message = DEFUALT_ERROR_MESSEGE;

          if (error instanceof AxiosError) {
            message =
              error.response?.data?.messege ||
              error.response?.data?.message ||
              "Email or password is incorrect";
          }

          set({
            isLoading: false,
            isSuccess: false,
            isError: true,
            error: message,
          });

  
}
      }
    }),
    {
      name: "userStore",
    }
  )
);