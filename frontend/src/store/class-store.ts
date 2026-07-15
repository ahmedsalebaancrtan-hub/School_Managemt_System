import { api, DEFUALT_ERROR_MESSEGE } from "@/lib/api";
import type {
  IClass,
  IClassResponse,
  ICreateClassRequest,
  IListClassessResponse,
} from "@/types/classes";
import { AxiosError } from "axios";
import { create } from "zustand";

interface ClassStore {
  data: IClass[];
  ClassDetails: IClass;

  isLoading: boolean;
  isCreateSuccess: boolean;
  isUpdateSuccess: boolean;
  isError: boolean;
  errorMsg: string;

  ListClasses: () => Promise<void>;
  CreateClass: (data: ICreateClassRequest) => Promise<void>;
  GetClassDetailsById: (id: string) => Promise<void>;
  UpdateClass: (id: string, data: ICreateClassRequest) => Promise<void>;

  ResetStatus: () => void;
}

export const useClassStore = create<ClassStore>((set) => ({
  data: [],
  ClassDetails: {} as IClass,

  isLoading: false,
  isCreateSuccess: false,
  isUpdateSuccess: false,
  isError: false,
  errorMsg: "",

  ResetStatus: () =>
    set({
      isCreateSuccess: false,
      isUpdateSuccess: false,
      isError: false,
      errorMsg: "",
    }),

  ListClasses: async () => {
    try {
      set({
        isLoading: true,
        isError: false,
        errorMsg: "",
      });

      const response = await api.get("/class/list");
      const data: IListClassessResponse = response.data;

      if (!data.is_sucess) {
        set({
          isLoading: false,
          isError: true,
          errorMsg: data.messege,
        });
        return;
      }

      set({
        isLoading: false,
        data: data.data,
      });
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        errorMsg:
          error instanceof AxiosError
            ? error.response?.data?.messege || DEFUALT_ERROR_MESSEGE
            : DEFUALT_ERROR_MESSEGE,
      });
    }
  },

  CreateClass: async (reqData) => {
    try {
      set({
        isLoading: true,
        isCreateSuccess: false,
        isError: false,
        errorMsg: "",
      });

      const response = await api.post("/class/create", reqData);
      const data: IClassResponse = response.data;

      if (!data.is_sucess) {
        set({
          isLoading: false,
          isError: true,
          errorMsg: data.messege,
        });
        return;
      }

      set({
        isLoading: false,
        isCreateSuccess: true,
        ClassDetails: data.data,
      });
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        errorMsg:
          error instanceof AxiosError
            ? error.response?.data?.messege || DEFUALT_ERROR_MESSEGE
            : DEFUALT_ERROR_MESSEGE,
      });
    }
  },

  UpdateClass: async (id, reqData) => {
    try {
      set({
        isLoading: true,
        isUpdateSuccess: false,
        isError: false,
        errorMsg: "",
      });

      const response = await api.put(`/class/update/${id}`, reqData);
      const data: IClassResponse = response.data;

      if (!data.is_sucess) {
        set({
          isLoading: false,
          isError: true,
          errorMsg: data.messege,
        });
        return;
      }

      set({
        isLoading: false,
        isUpdateSuccess: true,
        ClassDetails: data.data,
      });
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        errorMsg:
          error instanceof AxiosError
            ? error.response?.data?.messege || DEFUALT_ERROR_MESSEGE
            : DEFUALT_ERROR_MESSEGE,
      });
    }
  },

  GetClassDetailsById: async (id) => {
    try {
      set({
        isLoading: true,
        isError: false,
        errorMsg: "",
      });

      const response = await api.get(`/class/details/${id}`);
      const data: IClassResponse = response.data;

      if (!data.is_sucess) {
        set({
          isLoading: false,
          isError: true,
          errorMsg: data.messege,
        });
        return;
      }

      set({
        isLoading: false,
        ClassDetails: data.data,
      });
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        errorMsg:
          error instanceof AxiosError
            ? error.response?.data?.messege || DEFUALT_ERROR_MESSEGE
            : DEFUALT_ERROR_MESSEGE,
      });
    }
  },
}));