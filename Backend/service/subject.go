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

type SubjectService struct {
	SubjectRepo repository.SubjectRepo
}

func NewSubjectService(repo repository.SubjectRepo) *SubjectService {
	return &SubjectService{SubjectRepo: repo}
}

func (svc *SubjectService) CreateSubject(data dto.CreateSubjectDto) (int, error) {
	newSubject := models.Subject{
		Title: data.Title,
		Code:  data.Code,
	}

	if err := svc.SubjectRepo.CreateSubject(newSubject); err != nil {
		slog.Error("❌ Failed to save new subject", "error", err)
		return http.StatusInternalServerError, errors.New(constant.DefaultErrorMsg)
	}
	return http.StatusCreated, nil
}

func (svc *SubjectService) GetAllSubjects() ([]models.Subject, int, error) {
	subjects, err := svc.SubjectRepo.GetAllSubjects()
	if err != nil {
		slog.Error("❌ Failed to query subjects context collection", "error", err)
		return nil, http.StatusInternalServerError, errors.New(constant.DefaultErrorMsg)
	}
	return subjects, http.StatusOK, nil
}

func (svc *SubjectService) UpdateSubject(id uint, data dto.UpdateSubjectDto) (int, error) {
	subject, err := svc.SubjectRepo.GetSubjectByID(id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return http.StatusNotFound, errors.New("requested subject record does not exist")
		}
		return http.StatusInternalServerError, errors.New(constant.DefaultErrorMsg)
	}

	subject.Title = data.Title
	subject.Code = data.Code

	if err := svc.SubjectRepo.UpdateSubject(subject); err != nil {
		slog.Error("❌ Failed to execute subject database write modifications", "id", id, "error", err)
		return http.StatusInternalServerError, errors.New(constant.DefaultErrorMsg)
	}
	return http.StatusOK, nil
}
