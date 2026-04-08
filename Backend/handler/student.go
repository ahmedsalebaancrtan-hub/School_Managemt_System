package handler

import (
	"net/http"

	"github.com/ahmed/capstone_project/dto"
	"github.com/ahmed/capstone_project/infra"
	"github.com/ahmed/capstone_project/repository"
	"github.com/ahmed/capstone_project/service"
	"github.com/gin-gonic/gin"
)

type StudentHandler struct {
	StudentService *service.StudentService
}

func RegisterStudentHandler() *StudentHandler {

	Familyrepo := repository.NewFamilyRepo(infra.DB)
	StudentRepo := repository.NewSTudentRepo(infra.DB)
	StudentService := service.NewStudenService(StudentRepo, Familyrepo)

	return &StudentHandler{
		StudentService: StudentService,
	}

}

func (h *StudentHandler) CreateStudent(c *gin.Context) {

	var body dto.CreateStudentDto

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"messege":    "failed to Bind  body request",
			"is_success": false,
			"error":      err.Error(),
		})
		return

	}

	StatusCode, err := h.StudentService.CreateStudent(body)

	if err != nil {
		c.JSON(StatusCode, gin.H{
			"is_success": false,
			"messege":    err.Error(),
		})
		return
	}

	c.JSON(StatusCode, gin.H{
		"is_success": true,
		"messege":    "Student Created successfully",
	})
}

func (h *StudentHandler) ListStudent(c *gin.Context) {
	status, data, err := h.StudentService.ListStudent()
	if err != nil {
		c.JSON(status, gin.H{
			"is_success": false,
			"messege":    err.Error(),
		})
		return
	}
	c.JSON(status, gin.H{
		"is_success": true,
		"messege":    "Students Listed successfully",
		"data":       data,
	})

}
