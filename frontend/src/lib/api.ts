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

    if (config.url?.includes("/users/Refresh_token")){
      return config;
    }
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

    const { accessToken, refreshToken, SetUserData } =
      useUserStore.getState();

    // must have request + response
    if (!originalRequest || !error.response) {
      return Promise.reject(error);
    }

    // ONLY handle 401
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }

    // prevent retry loop
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // do NOT refresh if already calling refresh endpoint
    if (originalRequest.url?.includes("/users/Refresh_token")) {
      localStorage.clear();
      window.location.href = "/auth/login";
      return Promise.reject(error);
    }

    originalRequest._retry = true;

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

      // update request header
      originalRequest.headers.Authorization =
        `Bearer ${data.data.Access_token}`;

      // retry original request
      return api(originalRequest);
    } catch (err) {
      // localStorage.clear();
      // window.location.href = "/auth/login";
      return Promise.reject(err);
    }
  }
);