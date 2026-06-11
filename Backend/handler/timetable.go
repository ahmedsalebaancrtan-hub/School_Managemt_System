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

type TimetableHandler struct {
	Service *service.TimetableService
}

func RegisterTimetableHandler() *TimetableHandler {
	repo := repository.NewTimetableRepo(infra.DB)
	svc := service.NewTimetableService(*repo)
	return &TimetableHandler{Service: svc}
}

func (h *TimetableHandler) CreateSlot(c *gin.Context) {
	var body dto.CreateTimetableDto
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"is_success": false, "error": err.Error()})
		return
	}

	status, err := h.Service.AssignSlot(body)
	if err != nil {
		c.JSON(status, gin.H{"is_success": false, "message": err.Error()})
		return
	}
	c.JSON(status, gin.H{"is_success": true, "message": "Timetable period entry added successfully"})
}

func (h *TimetableHandler) GetClassSchedule(c *gin.Context) {
	classIDParam := c.Param("classId")
	classID, err := strconv.ParseUint(classIDParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"is_success": false, "message": "Invalid class parameter key identification"})
		return
	}

	schedule, status, err := h.Service.GetClassSchedule(uint(classID))
	if err != nil {
		c.JSON(status, gin.H{"is_success": false, "message": err.Error()})
		return
	}
	c.JSON(status, gin.H{"is_success": true, "data": schedule})
}
