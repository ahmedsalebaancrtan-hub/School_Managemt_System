package handler

import (
	"net/http"

	"github.com/ahmed/capstone_project/dto"
	"github.com/ahmed/capstone_project/infra"
	"github.com/ahmed/capstone_project/repository"
	"github.com/ahmed/capstone_project/service"
	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	Userservice service.Userservice
}

func RegisterUserHandler() *UserHandler {
	UserRepo := repository.RegisterRepo(infra.DB)
	usersvc := service.RegisterService(UserRepo)

	return &UserHandler{
		Userservice: *usersvc,
	}
}

func (h *UserHandler) CreateUser(c *gin.Context) {
	var RequestBody dto.CreateUserDto
	err := c.ShouldBindBodyWithJSON(&RequestBody)

	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"messege":    "failed to Bind  body request",
			"is_success": false,
		})
		return
	}

	StatusCode, err := h.Userservice.CreateUser(&RequestBody)

	if err != nil {
		c.JSON(StatusCode, gin.H{
			"is_success": false,
			"messege":    err.Error(),
		})
		return
	}

	c.JSON(StatusCode, gin.H{
		"is_sucess": true,
		"messege":   "User Created sucessfully!",
	})
}

func (h *UserHandler) LoginUser(c *gin.Context) {
	var RequestBody dto.LoginUserRequest
	err := c.ShouldBindBodyWithJSON(&RequestBody)

	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"messege":    "failed to Bind  body request",
			"is_success": false,
		})
		return
	}

	resp, StatusCode, err := h.Userservice.LoginUser(RequestBody)

	if err != nil {
		c.JSON(StatusCode, gin.H{
			"is_success": false,
			"messege":    err.Error(),
		})
		return
	}

	c.JSON(StatusCode, gin.H{
		"is_sucess": true,
		"messege":   "User Login sucessfully!",
		"data":      resp,
	})
}
