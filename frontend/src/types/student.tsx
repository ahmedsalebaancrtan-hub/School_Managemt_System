export interface IlistStudentResponse {
    data:       Datum[];
    is_success: boolean;
    message:    string;
}

export interface Datum {
    id:           number;
    student_code: string;
    first_name:   string;
    middle_name:  string;
    last_name:    string;
    gender:       string;
    Createdat:    Date;
    UpdatedAt:    Date;
    familyId:     number;
    family:       Family;
}

export interface Family {
    id:               number;
    familyName:       string;
    Parent_one_Name:  string;
    parent_one_phone: string;
    Parent_two_name:  string;
    Parent_two_phone: string;
    address:          string;
    Createdat:        Date;
    UpdatedAt:        Date;
}
