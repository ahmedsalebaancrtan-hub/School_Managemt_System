package service

import (
	"errors"
	"log/slog"
	"net/http"

	"github.com/ahmed/capstone_project/constant"
	"github.com/ahmed/capstone_project/dto"
	"github.com/ahmed/capstone_project/models"
	"github.com/ahmed/capstone_project/repository"
)

type TimetableService struct {
	Repo repository.TimetableRepo
}

func NewTimetableService(repo repository.TimetableRepo) *TimetableService {
	return &TimetableService{Repo: repo}
}

func (svc *TimetableService) AssignSlot(data dto.CreateTimetableDto) (int, error) {
	// 1. Double check teacher conflicts
	hasConflict, err := svc.Repo.CheckTeacherConflict(data.TeacherID, data.DayOfWeek, data.StartTime, data.EndTime)
	if err != nil {
		slog.Error("❌ Error searching timetable conflicts", "error", err)
		return http.StatusInternalServerError, errors.New(constant.DefaultErrorMsg)
	}
	if hasConflict {
		return http.StatusConflict, errors.New("conflict: this teacher is already assigned to another class during this time period")
	}

	// 2. Map payload to model structural layout
	newSlot := models.Timetable{
		ClassID:   data.ClassID,
		SubjectID: data.SubjectID,
		TeacherID: data.TeacherID,
		DayOfWeek: data.DayOfWeek,
		StartTime: data.StartTime,
		EndTime:   data.EndTime,
		Shift:     data.Shift,
	}

	if err := svc.Repo.CreateSlot(newSlot); err != nil {
		slog.Error("❌ Failed to commit new timetable row", "error", err)
		return http.StatusInternalServerError, errors.New(constant.DefaultErrorMsg)
	}

	return http.StatusCreated, nil
}

func (svc *TimetableService) GetClassSchedule(classID uint) ([]models.Timetable, int, error) {
	schedule, err := svc.Repo.GetClassTimetable(classID)
	if err != nil {
		slog.Error("❌ Failed to query database class schedule", "class_id", classID, "error", err)
		return nil, http.StatusInternalServerError, errors.New(constant.DefaultErrorMsg)
	}
	return schedule, http.StatusOK, nil
}
