import { api, DEFUALT_ERROR_MESSEGE } from "@/lib/api";
import type { IFamily, IListFamilyResponse } from "@/types/family";
import { AxiosError } from "axios";
import { create } from "zustand";

interface FamilyStore {
  data: IFamily[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMsg: string;

  ListFamily: () => Promise<void>;
  ResetStatus: () => void;
}

export const useFamilyStore = create<FamilyStore>((set) => ({
  data: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMsg: "",

  ResetStatus: () =>
    set({
      isSuccess: false,
      isLoading: false,
      isError: false,
      errorMsg: "",
    }),

  ListFamily: async () => {
    try {
      set({
        isLoading: true,
        isSuccess: false,
        isError: false,
        errorMsg: "",
      });

      const response = await api.get("/family/list");
      const data: IListFamilyResponse = response.data;

      if (!data.is_success) {
        set({
          isLoading: false,
          isSuccess: false,
          isError: true,
          errorMsg: data.message,
        });
        return;
      }

      set({
        isLoading: false,
        isSuccess: true,
        isError: false,
        errorMsg: "",
        data: data.data,
      });
    } catch (error) {
      set({
        isLoading: false,
        isSuccess: false,
        isError: true,
        errorMsg:
          error instanceof AxiosError
            ? error.response?.data?.message || DEFUALT_ERROR_MESSEGE
            : DEFUALT_ERROR_MESSEGE,
      });
    }
  },
}));