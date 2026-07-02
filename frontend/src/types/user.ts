export interface IuserLoginResponse {
    data:      Data;
    is_sucess: boolean;
    messege:   string;
}

export interface Data {
    Access_token:  string;
    Refresh_token: string;
    User:          User;
}

export interface User {
    id:           number;
    fullname:     string;
    emailaddress: string;
    role:         string;
    last_login:   Date;
    Createdat:    Date;
    Updatedat:    Date;
    DeletedAt:    Date;
}

export interface  IuserLoginRequest {
    emailaddress: string;
    password:     string;
}

export interface IWhoami {
    data:       Data;
    is_success: boolean;
    message:    string;
}

export interface Data {
    fullname:     string;
    emailaddress: string;
    role:         string;
}
