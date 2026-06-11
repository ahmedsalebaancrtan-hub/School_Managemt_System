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

type ExamHandler struct {
	Service *service.ExamService
}

func RegisterExamHandler() *ExamHandler {
	repo := repository.NewExamRepo(infra.DB)
	svc := service.NewExamService(*repo)
	return &ExamHandler{Service: svc}
}

func (h *ExamHandler) CreateExam(c *gin.Context) {
	var body dto.CreateExamDto
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"is_success": false, "error": err.Error()})
		return
	}

	status, err := h.Service.CreateExam(body)
	if err != nil {
		c.JSON(status, gin.H{"is_success": false, "message": err.Error()})
		return
	}
	c.JSON(status, gin.H{"is_success": true, "message": "Exam period created successfully"})
}

func (h *ExamHandler) GetAllExams(c *gin.Context) {
	exams, status, err := h.Service.GetExams()
	if err != nil {
		c.JSON(status, gin.H{"is_success": false, "message": err.Error()})
		return
	}
	c.JSON(status, gin.H{"is_success": true, "data": exams})
}

func (h *ExamHandler) UpdateStatus(c *gin.Context) {
	idParam := c.Param("id")
	examID, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"is_success": false, "message": "Invalid exam identification format"})
		return
	}

	var body dto.UpdateExamStatusDto
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"is_success": false, "error": err.Error()})
		return
	}

	status, err := h.Service.ToggleExamStatus(uint(examID), body)
	if err != nil {
		c.JSON(status, gin.H{"is_success": false, "message": err.Error()})
		return
	}
	c.JSON(status, gin.H{"is_success": true, "message": "Exam operational status updated"})
}
