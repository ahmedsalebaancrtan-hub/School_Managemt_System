package dto

type CreateUserDto struct {
	FullName     string `json:"fullname" binding:"required"`
	EmailAddress string `json:"emailaddress" binding:"required"`
	Password     string `json:"password" binding:"required,min=8,max=128"`
}
