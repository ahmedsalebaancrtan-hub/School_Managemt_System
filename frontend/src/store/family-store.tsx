import { api, DEFUALT_ERROR_MESSEGE } from "@/lib/api";
import type {
  ICreateFamilyRequest,
  IFamily,
  IListFamilyResponse,
} from "@/types/family";
import { AxiosError } from "axios";
import { create } from "zustand";

interface FamilyStore {
  data: IFamily[];

  isLoading: boolean;

  isListSuccess: boolean;
  isCreateSuccess: boolean;

  isError: boolean;
  errorMsg: string;

  ListFamily: () => Promise<void>;
  CreateFamily: (familyData: ICreateFamilyRequest) => Promise<void>;
  ResetStatus: () => void;
}

export const useFamilyStore = create<FamilyStore>((set) => ({
  data: [],

  isLoading: false,

  isListSuccess: false,
  isCreateSuccess: false,

  isError: false,
  errorMsg: "",

  ResetStatus: () =>
    set({
      isLoading: false,
      isListSuccess: false,
      isCreateSuccess: false,
      isError: false,
      errorMsg: "",
    }),

  ListFamily: async () => {
    try {
      set({
        isLoading: true,
        isListSuccess: false,
        isCreateSuccess: false,
        isError: false,
        errorMsg: "",
      });

      const response = await api.get("/family/list");
      const data: IListFamilyResponse = response.data;

      if (!data.is_success) {
        set({
          isLoading: false,
          isError: true,
          errorMsg: data.message,
        });
        return;
      }

      set({
        isLoading: false,
        isListSuccess: true,
        isError: false,
        errorMsg: "",
        data: data.data,
      });
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        errorMsg:
          error instanceof AxiosError
            ? error.response?.data?.message || DEFUALT_ERROR_MESSEGE
            : DEFUALT_ERROR_MESSEGE,
      });
    }
  },

  CreateFamily: async (familyData: ICreateFamilyRequest) => {
    try {
      set({
        isLoading: true,
        isCreateSuccess: false,
        isListSuccess: false,
        isError: false,
        errorMsg: "",
      });

      const response = await api.post("/family/create", familyData);
      const data = response.data;

      if (!data.is_success) {
        set({
          isLoading: false,
          isError: true,
          errorMsg: data.message,
        });
        return;
      }

      set({
        isLoading: false,
        isCreateSuccess: true,
        isError: false,
        errorMsg: "",
      });
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        errorMsg:
          error instanceof AxiosError
            ? error.response?.data?.message || DEFUALT_ERROR_MESSEGE
            : DEFUALT_ERROR_MESSEGE,
      });
    }
  },
}));