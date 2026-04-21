package service

import (
	"fmt"
	"log/slog"
	"net/http"

	"github.com/ahmed/capstone_project/constant"
	"github.com/ahmed/capstone_project/models"
	"github.com/ahmed/capstone_project/repository"
)

type MonthlyFeeService struct {
	MonthlyFeeRepo *repository.MonthlyFeeRepo
	studentRepo    *repository.StudentRepo
}

func NewMonthlyFeeService(MonthlyFeeRepo *repository.MonthlyFeeRepo, studentRepo *repository.StudentRepo) *MonthlyFeeService {
	return &MonthlyFeeService{
		MonthlyFeeRepo: MonthlyFeeRepo,
		studentRepo:    studentRepo,
	}
}

func (svc *MonthlyFeeService) GenerateFee(month string) (int, error) {
	// Get all student
	student, err := svc.studentRepo.ListStudent()
	if err != nil {
		slog.Error("failed to get list student", "error", err)
		return http.StatusInternalServerError, fmt.Errorf("failed to list student")
	}

	// Generate all fees to student
	for _, student := range student {
		fee := models.MonthlyFee{
			StudentID: student.ID,
			Month:     month,
			Is_Paid:   false,
			Amount:    float64(constant.STUDENT_FEE),
		}
		// Does  this student has the amount fee already generated,skip
		MonthlyFeeExisting := svc.MonthlyFeeRepo.CheckStudentfee(student.ID, month)
		if MonthlyFeeExisting != nil {
			slog.Info("Student has already this amount fee", "student_id", student.ID, "month", month)
			continue
		}
		err := svc.MonthlyFeeRepo.Create(&fee)
		if err != nil {
			slog.Error("failed to generate month fee", "error", err)
		}
	}
	return http.StatusCreated, nil
}

func (svc *MonthlyFeeService) ListMonthlyFee() (int, []models.MonthlyFee, error) {
	data, err := svc.MonthlyFeeRepo.List()
	if err != nil {
		return http.StatusInternalServerError, nil, err
	}
	return http.StatusOK, data, nil
}
