package service

import (
	"errors"
	"fmt"
	"log/slog"
	"net/http"
	"time"

	"github.com/ahmed/capstone_project/constant"
	"github.com/ahmed/capstone_project/dto"
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
	student, err := svc.studentRepo.ListStudent()
	if err != nil {
		slog.Error("failed to get list student", "error", err)
		return http.StatusInternalServerError, fmt.Errorf("failed to list student")
	}

	for _, student := range student {
		fee := models.MonthlyFee{
			StudentID:        student.ID,
			Month:            month,
			IsPaid:           false,
			Amount:           float64(constant.STUDENT_FEE),
			RemainingBalance: float64(constant.STUDENT_FEE), // Default balance equals total base fee amount
		}

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

func (svc *MonthlyFeeService) AcceptPayment(req dto.AcceptPyment) (int, error) {
	// 1. Locate the monthly fee invoice record row
	fee := svc.MonthlyFeeRepo.CheckStudentfee(req.StudentID, req.Month)
	if fee == nil {
		slog.Error("failed to get monthly fee record for payment transaction", "student_id", req.StudentID, "month", req.Month)
		return http.StatusNotFound, errors.New("monthly fee profile not found for this student and month")
	}

	// 2. Protect against paying an already finalized balance record invoice
	if fee.IsPaid {
		return http.StatusBadRequest, errors.New("payment rejected: this specific invoice balance is already fully paid")
	}

	// 3. Aggregate incremental tracking values
	fee.DiscountAmount += req.DiscountAmount
	fee.PaidAmount += req.AmountPaid

	// 4. Recalculate remaining ledger liability formulas dynamically
	// Remaining Balance = Total Base Amount - Total Discounts Applied - Total Cumulative Payments
	fee.RemainingBalance = fee.Amount - fee.DiscountAmount - fee.PaidAmount

	// 5. Handle overpayment verification rules cleanly
	if fee.RemainingBalance < 0 {
		return http.StatusBadRequest, fmt.Errorf("payment rejected: amount entered exceeds remaining active invoice liability balance by $%v", -fee.RemainingBalance)
	}

	// 6. Flip internal state flag switch indicators when the remaining ledger liability clears
	if fee.RemainingBalance == 0 {
		fee.IsPaid = true
		fee.PaidAt = time.Now()
	}

	// 7. Write changes back to your SQL engine
	err := svc.MonthlyFeeRepo.Update(fee)
	if err != nil {
		slog.Error("failed to save payment update to database", "error", err)
		return http.StatusInternalServerError, errors.New(constant.DefaultErrorMsg)
	}

	return http.StatusOK, nil
}
