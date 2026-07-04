import { useUserStore } from "@/store/user.store";
import type { IrefreshTokenResponse } from "@/types/user";
import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const DEFUALT_ERROR_MESSEGE =
  "something went wrong. please try again later";

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = useUserStore.getState().accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    const { SetUserData, refreshToken } = useUserStore.getState();

    // If no response or no request, just fail
    if (!error.response || !originalRequest) {
      return Promise.reject(error);
    }

    // Don't try to refresh if it's NOT 401
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }

    // Prevent infinite loop: don't refresh on refresh endpoint itself
    if (originalRequest.url?.includes("/users/Refresh_token")) {
      localStorage.clear();
      window.location.href = "/auth/login";
      return Promise.reject(error);
    }

    try {
      const response = await api.post(
        "/users/Refresh_token",
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      const data: IrefreshTokenResponse = response.data;

      // update store
      SetUserData(data);

      // update original request with new token
      originalRequest.headers.Authorization = `Bearer ${data.data.Access_token}`;

      // retry original request
      return api(originalRequest);
    } catch (err) {
      console.log("refresh token failed");

      localStorage.clear();
      window.location.href = "/auth/login";

      return Promise.reject(err);
    }
  }
);