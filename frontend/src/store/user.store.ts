import { api, DEFUALT_ERROR_MESSEGE } from "@/lib/api";
import type {
  IrefreshTokenResponse,
  IuserLoginRequest,
  IuserLoginResponse,
  IwhoAmIResponse,
  User,
  UserProfile,
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
  profile: UserProfile | null;

  accessToken: string;
  refreshToken: string;

  loginUser: (data: IuserLoginRequest) => Promise<void>;
  WhoAmI: () => Promise<void>;
  logout: () => void;
  SetUserData: (data: IrefreshTokenResponse) => void;
}

export const useUserStore = create<IUserStore>()(
  persist(
    (set) => ({
      isLoading: false,
      isSuccess: false,
      isError: false,
      error: "",

      user: {} as User,
      profile: null,

      accessToken: "",
      refreshToken: "",

      logout: () => {
        set({
          isLoading: false,
          isSuccess: false,
          isError: false,
          error: "",
          user: {} as User,
          profile: null,
          accessToken: "",
          refreshToken: "",
        });

        localStorage.clear();
        window.location.href = "/auth/login";
      },

      loginUser: async (reqData: IuserLoginRequest) => {
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

      WhoAmI: async () => {
        set({
          isLoading: true,
          isSuccess: false,
          isError: false,
          error: "",
        });

        try {
          const response = await api.get("/users/whoami");
          const data: IwhoAmIResponse = response.data;

          set({
            isLoading: false,
            isSuccess: true,
            isError: false,
            error: "",
            profile: data.data,
          });
        } catch (error) {
          let message = DEFUALT_ERROR_MESSEGE;

          if (error instanceof AxiosError) {
            message =
              error.response?.data?.messege ||
              error.response?.data?.message ||
              DEFUALT_ERROR_MESSEGE;
          }

          set({
            isLoading: false,
            isSuccess: false,
            isError: true,
            error: message,
          });
        }
      },

      SetUserData: (data: IrefreshTokenResponse) => {
        set({
          isLoading: false,
          isSuccess: true,
          isError: false,
          error: "",
          accessToken: data.data.Access_token,
          refreshToken: data.data.Refresh_token,
          user: data.data.User,
        });
      },
    }),
    {
      name: "userStore",
    }
  )
);