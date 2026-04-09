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

type StudentClassService struct {
	StudentClassRepo *repository.StudentClassRepo
}

func NewSTudentClassServ(StudentClassRepo *repository.StudentClassRepo) *StudentClassService {
	return &StudentClassService{
		StudentClassRepo: StudentClassRepo,
	}
}

func (svc *StudentClassService) AddStudentToClass(data *dto.AddStudentClassDto) (int, error) {

	//check student has an active class

	student, _ := svc.StudentClassRepo.GetActiveClass(data.StudentID)

	if student.ID != 0 {
		return http.StatusBadRequest, errors.New("this student already another class. Please deactivate that class first")

	}

	err := svc.StudentClassRepo.AddStudentClass(data.ClassID, data.StudentID)

	if err != nil {
		slog.Info("failed to add student to a class", "error", err)
		return http.StatusInternalServerError, errors.New(constant.DefaultErrorMsg)
	}

	return http.StatusOK, nil

}

func (svc *StudentClassService) ListSTudentClass(ClassID uint) (int, []models.StudentClass, error) {
	ClassStudent, err := svc.StudentClassRepo.GetClassStudent(ClassID)

	if err != nil {
		slog.Info("failed to get class student", "error", err)

		return http.StatusInternalServerError, nil, errors.New(constant.DefaultErrorMsg)

	}

	return http.StatusOK, ClassStudent, nil
}
