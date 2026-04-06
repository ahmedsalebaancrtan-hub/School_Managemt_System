package handler

import (
	"net/http"

	"github.com/ahmed/capstone_project/dto"
	"github.com/ahmed/capstone_project/infra"
	"github.com/ahmed/capstone_project/repository"
	"github.com/ahmed/capstone_project/service"
	"github.com/gin-gonic/gin"
)

type ClassHandler struct {
	ClassService service.ClassService
}

func RegisterClassHandler() *ClassHandler {

	classrepo := repository.NewClassRegister(infra.DB)
	classsvc := service.RegisterClassRepo(&classrepo)

	return &ClassHandler{

		ClassService: *classsvc,
	}

}

func (h *ClassHandler) CreateClass(c *gin.Context) {
	var RequestBody dto.CreateClassdto
	err := c.ShouldBindBodyWithJSON(&RequestBody)

	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"messege":    "failed to Bind  body request",
			"is_success": false,
			"error":      err.Error(),
		})
		return
	}

	StatusCode, NewClass, err := h.ClassService.CreateClass(&RequestBody)

	if err != nil {
		c.JSON(StatusCode, gin.H{
			"is_success": false,
			"messege":    err.Error(),
		})
		return
	}

	c.JSON(StatusCode, gin.H{
		"is_sucess": true,
		"messege":   "Class Created sucessfully!",
		"data":      NewClass,
	})
}
