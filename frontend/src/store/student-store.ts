import { api, DEFUALT_ERROR_MESSEGE } from "@/lib/api";
import type { IlistStudentResponse, IStudent } from "@/types/student";
import { AxiosError } from "axios";
import { create } from "zustand";

interface StudentStore {
  data: IStudent[];
  isLoading: boolean;
  isCreateSuccess: boolean;
  isUpdateSuccess: boolean;
  isError: boolean;
  errorMsg: string;

  ListStudents: () => Promise<void>;
  ResetStatus: () => void;
}

export const useStudentStore = create<StudentStore>((set) => ({
  data: [],
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

  ListStudents: async () => {
    try {
      set({
        isLoading: true,
        isError: false,
        errorMsg: "",
      });

      const response = await api.get("/student/list");
      const data: IlistStudentResponse = response.data;

      if (!data.is_success) {
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
}));