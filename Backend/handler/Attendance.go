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

type AttendanceHandler struct {
	Service *service.AttendanceService
}

func RegisterAttendanceHandler() *AttendanceHandler {
	repo := repository.NewAttendanceRepo(infra.DB)
	svc := service.NewAttendanceService(*repo)
	return &AttendanceHandler{Service: svc}
}

func (h *AttendanceHandler) SubmitAttendance(c *gin.Context) {
	// Extract staff ID from auth context middleware
	userID, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"is_success": false, "message": "Unauthorized context action"})
		return
	}
	staffID := userID.(uint)

	var body dto.BulkAttendanceDto
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"is_success": false, "error": err.Error()})
		return
	}

	status, err := h.Service.ProcessBulkAttendance(staffID, body)
	if err != nil {
		c.JSON(status, gin.H{"is_success": false, "message": err.Error()})
		return
	}
	c.JSON(status, gin.H{"is_success": true, "message": "Attendance records successfully cataloged"})
}

func (h *AttendanceHandler) GetDailySheet(c *gin.Context) {
	classIDParam := c.Param("classId")
	dateParam := c.Query("date") // e.g. /sheet/1?date=2026-06-11

	classID, err := strconv.ParseUint(classIDParam, 10, 32)
	if err != nil || dateParam == "" {
		c.JSON(http.StatusBadRequest, gin.H{"is_success": false, "message": "Invalid query arguments"})
		return
	}

	logs, status, err := h.Service.GetDailySheet(uint(classID), dateParam)
	if err != nil {
		c.JSON(status, gin.H{"is_success": false, "message": err.Error()})
		return
	}
	c.JSON(status, gin.H{"is_success": true, "data": logs})
}
