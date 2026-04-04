package dto

import "github.com/ahmed/capstone_project/models"

type CreateUserDto struct {
	FullName     string      `json:"fullname" binding:"required"`
	EmailAddress string      `json:"emailaddress" binding:"required"`
	Password     string      `json:"password" binding:"required,min=8,max=128"`
	Role         models.Role `json:"role" binding:"required,oneof=ADMIN STUDENT_AFFAIRS CASHIER STUDENT"`
}

type LoginUserRequest struct {
	EmailAddress string `json:"emailaddress" binding:"required"`
	Password     string `json:"password" binding:"required,min=8,max=128"`
}

type LoginUserResponse struct {
	AccessToken  string      `json:"Access_token"`
	RefreshToken string      `json:"Refresh_token"`
	User         models.User `json:"User"`
}
