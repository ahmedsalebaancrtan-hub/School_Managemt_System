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
	// 1. Fetch the successfully parsed userID from the middleware context
	ctxUserID, exists := c.Get("user_id") // ✅ Matches the snake_case key in your middleware
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"is_success": false,
			"message":    "Unauthorized: Missing user authentication context",
		})
		return
	}

	// 2. Type assert safely to uint
	staffID, ok := ctxUserID.(uint)
	if !ok || staffID == 0 {
		c.JSON(http.StatusUnauthorized, gin.H{
			"is_success": false,
			"message":    "Unauthorized: Invalid user identity structure",
		})
		return
	}

	// 3. Process incoming body data payload
	var body dto.BulkAttendanceDto
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"is_success": false, "error": err.Error()})
		return
	}

	// 4. Pass the verified staffID directly to your service
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
