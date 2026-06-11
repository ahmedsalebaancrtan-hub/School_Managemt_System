package service

import (
	"errors"
	"log/slog"
	"net/http"
	"time"

	"github.com/ahmed/capstone_project/constant"
	"github.com/ahmed/capstone_project/dto"
	"github.com/ahmed/capstone_project/models"
	"github.com/ahmed/capstone_project/repository"
)

type AttendanceService struct {
	Repo repository.AttendanceRepo
}

func NewAttendanceService(repo repository.AttendanceRepo) *AttendanceService {
	return &AttendanceService{Repo: repo}
}

func (svc *AttendanceService) ProcessBulkAttendance(staffID uint, data dto.BulkAttendanceDto) (int, error) {
	parsedDate, err := time.Parse("2006-01-02", data.Date)
	if err != nil {
		return http.StatusBadRequest, errors.New("invalid date format. Use YYYY-MM-DD")
	}

	var dbRecords []models.Attendance
	for _, item := range data.Records {
		dbRecords = append(dbRecords, models.Attendance{
			StudentID:   item.StudentID,
			ClassID:     data.ClassID,
			Date:        parsedDate,
			Status:      item.Status,
			Remarks:     item.Remarks,
			CreatedByID: staffID,
		})
	}

	if err := svc.Repo.SaveBulkAttendance(dbRecords); err != nil {
		slog.Error("❌ Failed to save bulk attendance entry logs", "error", err)
		return http.StatusInternalServerError, errors.New(constant.DefaultErrorMsg)
	}

	return http.StatusOK, nil
}

func (svc *AttendanceService) GetDailySheet(classID uint, dateStr string) ([]models.Attendance, int, error) {
	_, err := time.Parse("2006-01-02", dateStr)
	if err != nil {
		return nil, http.StatusBadRequest, errors.New("invalid date format. Use YYYY-MM-DD")
	}

	logs, err := svc.Repo.GetClassAttendanceByDate(classID, dateStr)
	if err != nil {
		slog.Error("❌ Failed to pull attendance records", "class_id", classID, "error", err)
		return nil, http.StatusInternalServerError, errors.New(constant.DefaultErrorMsg)
	}
	return logs, http.StatusOK, nil
}
