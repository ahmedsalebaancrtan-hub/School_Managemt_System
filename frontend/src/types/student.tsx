import type { IFamily } from "./family";

export interface IlistStudentResponse {
    data:      IStudent[];
    is_success: boolean;
    messege:    string;
}

export interface IStudent  {
    id:           number;
    student_code: string;
    first_name:   string;
    middle_name:  string;
    last_name:    string;
    gender:       string;
    Createdat:    Date;
    UpdatedAt:    Date;
    familyId:     number;
    family:       IFamily;
}
