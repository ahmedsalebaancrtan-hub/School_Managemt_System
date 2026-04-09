package handler

import (
	"net/http"
	"strconv"

	"github.com/ahmed/capstone_project/dto"
	"github.com/ahmed/capstone_project/infra"
	"github.com/ahmed/capstone_project/repository"
	"github.com/ahmed/capstone_project/service"
	"github.com/gin-gonic/gin"
)

type StudentClassHandler struct {
	STudentClassService *service.StudentClassService
}

func RegisterStudentClass() *StudentClassHandler {

	StudentClassRepo := repository.NewStudentClassRepo(infra.DB)
	StudentClassService := service.NewSTudentClassServ(StudentClassRepo)

	return &StudentClassHandler{
		STudentClassService: StudentClassService,
	}

}

func (h *StudentClassHandler) AddSTudentClass(c *gin.Context) {

	var body dto.AddStudentClassDto

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"messege":    "failed to Bind  body request",
			"is_success": false,
			"error":      err.Error(),
		})
		return

	}

	StatusCode, err := h.STudentClassService.AddStudentToClass(&body)

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

func (h *StudentClassHandler) FindClassStudentByClassID(c *gin.Context) {
	IdStr := c.Param("class_id")
	id, err := strconv.Atoi(IdStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"messege":    "failed to get classId param",
			"is_success": false,
			"error":      err.Error(),
		})
		return
	}
	status, classStudent, err := h.STudentClassService.ListSTudentClass(uint(id))

	if err != nil {
		c.JSON(status, gin.H{
			"is_success": false,
			"messege":    err.Error(),
		})
		return
	}

	c.JSON(status, gin.H{
		"messege":    "class fetched successfully",
		"is_success": true,
		"data":       classStudent,
	})
}
