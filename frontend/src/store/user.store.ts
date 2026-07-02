import { create } from "zustand"
import { persist } from "zustand/middleware"
import { api, DEFUALT_ERROR_MESSEGE } from "@/lib/api"
import { AxiosError } from "axios"

export interface User {
  id: number
  fullname: string
  emailaddress: string
  role: string
  last_login: Date
  Createdat: Date
  Updatedat: Date
  DeletedAt: Date
}

interface IUserStore {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  error: string

  user: User | null
  accessToken: string
  refreshToken: string

  loginUser: (data: any) => Promise<void>
  WhoAmI: () => Promise<void>
}

export const useUserStore = create<IUserStore>()(
  persist(
    (set, get) => ({
      isLoading: false,
      isSuccess: false,
      isError: false,
      error: "",

      user: null,
      accessToken: "",
      refreshToken: "",

      loginUser: async (reqData) => {
        set({ isLoading: true })

        try {
          const res = await api.post("/users/Login", reqData)

          const data = res.data

          if (!data.is_sucess) {
            set({
              isLoading: false,
              isError: true,
              error: data.messege,
            })
            return
          }

          set({
            isLoading: false,
            isSuccess: true,
            accessToken: data.data.Access_token,
            refreshToken: data.data.Refresh_token,
            user: data.data.User,
          })
        } catch (error) {
          let message = DEFUALT_ERROR_MESSEGE

          if (error instanceof AxiosError) {
            message =
              error.response?.data?.messege ||
              "Login failed"
          }

          set({
            isLoading: false,
            isError: true,
            error: message,
          })
        }
      },

      WhoAmI: async () => {
        set({ isLoading: true })

        try {
          const res = await api.get("/users/whoami")

          set({
            isLoading: false,
            isSuccess: true,
            user: res.data?.data?.User,
          })
        } catch (error) {
          let message = DEFUALT_ERROR_MESSEGE

          if (error instanceof AxiosError) {
            message =
              error.response?.data?.messege ||
              "Unauthorized"
          }

          set({
            isLoading: false,
            isError: true,
            error: message,
            user: null,
          })
        }
      },
    }),
    {
      name: "user-store",
    }
  )
)