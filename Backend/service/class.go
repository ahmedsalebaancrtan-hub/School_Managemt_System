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

type ClassService struct {
	classRepo repository.ClassRepo
}

func RegisterClassRepo(repo *repository.ClassRepo) *ClassService {
	return &ClassService{
		classRepo: *repo,
	}

}

func (svc *ClassService) CreateClass(data *dto.CreateClassdto) (int, models.Class, error) {
	var NewClass = models.Class{
		Title:        data.Title,
		AcademicYear: data.AcademicYear,
	}

	err := svc.classRepo.CreateClass(NewClass)

	if err != nil {
		slog.Error("failed to register new Class", err.Error())
		return http.StatusInternalServerError, models.Class{}, errors.New(constant.DefaultErrorMsg)
	}

	return http.StatusCreated, NewClass, nil
}
