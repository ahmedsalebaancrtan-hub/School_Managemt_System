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
