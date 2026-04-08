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

type StudentService struct {
	StudentRepo *repository.StudentRepo
	familyRepo  *repository.FamilyRepo
}

func NewStudenService(StudentRepo *repository.StudentRepo, familyRepo *repository.FamilyRepo) *StudentService {

	return &StudentService{
		StudentRepo: StudentRepo,
		familyRepo:  familyRepo,
	}
}

func (svc *StudentService) CreateStudent(data dto.CreateStudentDto) (int, error) {

	ExistingFamily, err := svc.familyRepo.GetfamilyByID(data.FamilyID)

	if err != nil {
		return http.StatusNotFound, err
	}

	var NewStudent = models.Student{
		FirstName:  data.FirstName,
		MiddleName: data.MiddleName,
		LastName:   data.LastName,
		FamilyID:   ExistingFamily.ID,
	}
	err = svc.StudentRepo.CreateStudent(NewStudent)

	if err != nil {
		slog.Info("failed to create student", "error", err)
		return http.StatusInternalServerError, errors.New(constant.DefaultErrorMsg)
	}

	return http.StatusCreated, nil

}

func (svc *StudentService) ListStudent() (int, []models.Student, error) {
	data, err := svc.StudentRepo.ListStudent()
	if err != nil {
		slog.Info("Failed to list student", "error", err)
		return http.StatusInternalServerError, nil, errors.New(constant.DefaultErrorMsg)
	}

	return http.StatusOK, data, nil

}
