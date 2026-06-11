package service

import (
	"errors"
	"log/slog"
	"net/http"

	"github.com/ahmed/capstone_project/constant"
	"github.com/ahmed/capstone_project/dto"
	"github.com/ahmed/capstone_project/models"
	"github.com/ahmed/capstone_project/repository"
	"gorm.io/gorm"
)

type ExamService struct {
	Repo repository.ExamRepo
}

func NewExamService(repo repository.ExamRepo) *ExamService {
	return &ExamService{Repo: repo}
}

func (svc *ExamService) CreateExam(data dto.CreateExamDto) (int, error) {
	newExam := models.Exam{
		Title:        data.Title,
		AcademicYear: data.AcademicYear,
		Term:         data.Term,
		IsActive:     true,
	}

	if err := svc.Repo.CreateExam(newExam); err != nil {
		slog.Error("❌ Failed to create exam cycle", "error", err)
		return http.StatusInternalServerError, errors.New(constant.DefaultErrorMsg)
	}
	return http.StatusCreated, nil
}

func (svc *ExamService) GetExams() ([]models.Exam, int, error) {
	exams, err := svc.Repo.GetAllExams()
	if err != nil {
		slog.Error("❌ Failed to retrieve exam records", "error", err)
		return nil, http.StatusInternalServerError, errors.New(constant.DefaultErrorMsg)
	}
	return exams, http.StatusOK, nil
}

func (svc *ExamService) ToggleExamStatus(id uint, data dto.UpdateExamStatusDto) (int, error) {
	exam, err := svc.Repo.GetExamByID(id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return http.StatusNotFound, errors.New("exam session not found")
		}
		return http.StatusInternalServerError, errors.New(constant.DefaultErrorMsg)
	}

	exam.IsActive = data.IsActive
	if err := svc.Repo.UpdateExam(exam); err != nil {
		slog.Error("❌ Failed to update exam status", "id", id, "error", err)
		return http.StatusInternalServerError, errors.New(constant.DefaultErrorMsg)
	}
	return http.StatusOK, nil
}
