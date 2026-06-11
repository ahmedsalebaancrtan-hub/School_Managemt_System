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

type SubjectHandler struct {
	Service *service.SubjectService
}

func RegisterSubjectHandler() *SubjectHandler {
	repo := repository.NewSubjectRepo(infra.DB)
	svc := service.NewSubjectService(*repo)
	return &SubjectHandler{Service: svc}
}

func (h *SubjectHandler) CreateSubject(c *gin.Context) {
	var body dto.CreateSubjectDto
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"is_success": false, "error": err.Error()})
		return
	}

	status, err := h.Service.CreateSubject(body)
	if err != nil {
		c.JSON(status, gin.H{"is_success": false, "message": err.Error()})
		return
	}
	c.JSON(status, gin.H{"is_success": true, "message": "Subject created successfully"})
}

func (h *SubjectHandler) GetAllSubjects(c *gin.Context) {
	subjects, status, err := h.Service.GetAllSubjects()
	if err != nil {
		c.JSON(status, gin.H{"is_success": false, "message": err.Error()})
		return
	}
	c.JSON(status, gin.H{"is_success": true, "data": subjects})
}

func (h *SubjectHandler) UpdateSubject(c *gin.Context) {
	idParam := c.Param("id")
	subjectID, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"is_success": false, "message": "Invalid subject structural key formatting"})
		return
	}

	var body dto.UpdateSubjectDto
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"is_success": false, "error": err.Error()})
		return
	}

	status, err := h.Service.UpdateSubject(uint(subjectID), body)
	if err != nil {
		c.JSON(status, gin.H{"is_success": false, "message": err.Error()})
		return
	}
	c.JSON(status, gin.H{"is_success": true, "message": "Subject details successfully updated"})
}
