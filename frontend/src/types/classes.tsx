export interface IListClassessResponse {
    data: IClass[];
    is_sucess: boolean;
    messege:   string;
}


export interface IClass {
    id:           number;
    title:        string;
    AcademicYear: string;
    Createdat:    Date;
    UpdatedAt:    Date;

}
export interface ICreateClassRequest {
    title:        string;
    AcademicYear: string;
}
export interface IClassResponse {
    data:      IClass;
    is_sucess: boolean;
    messege:   string;
}

