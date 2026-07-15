import { api, DEFUALT_ERROR_MESSEGE } from "@/lib/api";
import type { IClass, ICreateClassRequest, IClassResponse, IListClassessResponse } from "@/types/classes";
import { AxiosError } from "axios";
import { create } from "zustand";

interface ClassStore {

    data : IClass[],
    ClassDetails : IClass
    isLoading : boolean,
    isSucess : boolean,
    isError : boolean,
    errorMsg : string,
    ListClasses : () => void
    CreateClass : (data : ICreateClassRequest) => void
    GetClassDetailsById : (id : string ) => void
}

export const useClassStore = create<ClassStore>((set) => ({
    data : [],
    ClassDetails : {} as IClass,
    isLoading : false,
    isSucess : false,
    isError : false,
    errorMsg : "",

    ListClasses : async () =>{
        try {
            set({
                   isLoading : true,
                isSucess : false,
                isError : false, 
                errorMsg : "",
                
            })
            const response = await api.get("/class/list")
            const data : IListClassessResponse = response.data

            if(!data.is_sucess) {
                set({
                    isLoading : false, 
                    isSucess : false,
                    isError : true, 
                    errorMsg : data.messege
                })
                return
            }

            set({
                isLoading : false,
                // isSucess : true,
                isError : false, 
                errorMsg : "",
                data : data.data
            })
            
        } catch (error) {

            if ( error instanceof AxiosError) {
                set({
               isLoading : false,
                isSucess : false,
                isError : true, 
                errorMsg : error?.response?.data?.messege || DEFUALT_ERROR_MESSEGE
              
                })

            }
            
        }


    },
    CreateClass: async (reqData) => {
        try {
            set({
                isLoading: true,
                isSucess: false,
                isError: false,
                errorMsg: "",
            });

            const response = await api.post("/class/create", reqData);
            const data: IClassResponse = response.data;

            if (!data.is_sucess) {
                set({
                    isLoading: false,
                    isSucess: false,
                    isError: true,
                    errorMsg: data.messege,
                });
                return;
            }

            set({
                isLoading: false,
                isSucess: true,
                isError: false,
                errorMsg: "",
                ClassDetails : data.data
            });

        } catch (error) {
            if (error instanceof AxiosError) {
                set({
                    isLoading: false,
                    isSucess: false,
                    isError: true,
                    errorMsg:
                        error.response?.data?.messege ||
                        DEFUALT_ERROR_MESSEGE,
                });
            } else {
                set({
                    isLoading: false,
                    isSucess: false,
                    isError: true,
                    errorMsg: DEFUALT_ERROR_MESSEGE,
                });
            }
        }
    },
    GetClassDetailsById: async (id) => {
        try {
            set({
                isLoading: true,
                isSucess: false,
                isError: false,
                errorMsg: "",
            });

            const response = await api.get("/class/details/"+ id);
            const data: IClassResponse = response.data;

            if (!data.is_sucess) {
                set({
                    isLoading: false,
                    isSucess: false,
                    isError: true,
                    errorMsg: data.messege,
                });
                return;
            }

            set({
                isLoading: false,
                isSucess: true,
                isError: false,
                errorMsg: "",
            });

        } catch (error) {
            if (error instanceof AxiosError) {
                set({
                    isLoading: false,
                    isSucess: false,
                    isError: true,
                    errorMsg:
                        error.response?.data?.messege ||
                        DEFUALT_ERROR_MESSEGE,
                });
            } else {
                set({
                    isLoading: false,
                    isSucess: false,
                    isError: true,
                    errorMsg: DEFUALT_ERROR_MESSEGE,
                });
            }
        }
    },
}));