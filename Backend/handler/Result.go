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

type ResultHandler struct {
	Service *service.ResultService
}

func RegisterResultHandler() *ResultHandler {
	repo := repository.NewResultRepo(infra.DB)
	svc := service.NewResultService(*repo)
	return &ResultHandler{Service: svc}
}

func (h *ResultHandler) SubmitResults(c *gin.Context) {
	var body dto.BulkResultDto
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"is_success": false, "error": err.Error()})
		return
	}

	status, err := h.Service.LogBulkResults(body)
	if err != nil {
		c.JSON(status, gin.H{"is_success": false, "message": err.Error()})
		return
	}
	c.JSON(status, gin.H{"is_success": true, "message": "Student marks completely indexed"})
}

func (h *ResultHandler) GetReportCard(c *gin.Context) {
	studentParam := c.Param("studentId")
	examParam := c.Query("examId")

	studentID, err1 := strconv.ParseUint(studentParam, 10, 32)
	examID, err2 := strconv.ParseUint(examParam, 10, 32)

	if err1 != nil || err2 != nil {
		c.JSON(http.StatusBadRequest, gin.H{"is_success": false, "message": "Missing or malformed tracking arguments"})
		return
	}

	data, status, err := h.Service.GetReportCard(uint(studentID), uint(examID))
	if err != nil {
		c.JSON(status, gin.H{"is_success": false, "message": err.Error()})
		return
	}
	c.JSON(status, gin.H{"is_success": true, "data": data})
}
