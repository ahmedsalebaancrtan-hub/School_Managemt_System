export interface User {
  id: number;
  fullname: string;
  emailaddress: string;
  role: string;
  createdat: Date;
  updatedat: Date;
  deletedat: Date;
  last_login: Date;
}

export interface UserProfile {
  fullname: string;
  emailaddress: string;
  role: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  last_login: Date;
}

export interface IuserLoginRequest {
  emailaddress: string;
  password: string;
}

export interface IuserLoginResponse {
  is_sucess: boolean;
  messege: string;
  data: {
    User: User;
    Access_token: string;
    Refresh_token: string;
  };
}

export interface IwhoAmIResponse {
  is_success: boolean;
  message: string;
  data: UserProfile;
}

export interface IrefreshTokenResponse {
    data:       Data;
    is_success: boolean;
    message:    string;
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
