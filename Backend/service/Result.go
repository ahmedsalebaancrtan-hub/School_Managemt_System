package service

import (
	"errors"
	"fmt"
	"log/slog"
	"net/http"

	"github.com/ahmed/capstone_project/constant"
	"github.com/ahmed/capstone_project/dto"
	"github.com/ahmed/capstone_project/models"
	"github.com/ahmed/capstone_project/repository"
)

type ResultService struct {
	Repo repository.ResultRepo
}

func NewResultService(repo repository.ResultRepo) *ResultService {
	return &ResultService{Repo: repo}
}

func (svc *ResultService) LogBulkResults(data dto.BulkResultDto) (int, error) {
	var dbRecords []models.Result

	for _, grade := range data.Grades {
		// Business Rule: Score cannot exceed the total possible marks
		if grade.MarksObtained > data.MaxMarks {
			return http.StatusBadRequest, fmt.Errorf("invalid entry: student ID %d scored %v which exceeds max possible marks (%v)", grade.StudentID, grade.MarksObtained, data.MaxMarks)
		}

		dbRecords = append(dbRecords, models.Result{
			ExamID:        data.ExamID,
			StudentID:     grade.StudentID,
			SubjectID:     data.SubjectID,
			MarksObtained: grade.MarksObtained,
			MaxMarks:      data.MaxMarks,
			Remarks:       grade.Remarks,
		})
	}

	if err := svc.Repo.SaveBulkResults(dbRecords); err != nil {
		slog.Error("❌ Database failure inserting academic results batch", "error", err)
		return http.StatusInternalServerError, errors.New(constant.DefaultErrorMsg)
	}

	return http.StatusOK, nil
}

func (svc *ResultService) GetReportCard(studentID uint, examID uint) ([]models.Result, int, error) {
	reports, err := svc.Repo.GetStudentReportCard(studentID, examID)
	if err != nil {
		slog.Error("❌ Failed to resolve student report collection metadata", "student", studentID, "error", err)
		return nil, http.StatusInternalServerError, errors.New(constant.DefaultErrorMsg)
	}
	return reports, http.StatusOK, nil
}
