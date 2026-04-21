package repository

import (
	"github.com/ahmed/capstone_project/models"
	"gorm.io/gorm"
)

type MonthlyFeeRepo struct {
	DB *gorm.DB
}

func NewMonthlyFeeRepo(db *gorm.DB) *MonthlyFeeRepo {
	return &MonthlyFeeRepo{
		DB: db,
	}
}

func (r *MonthlyFeeRepo) Create(fee *models.MonthlyFee) error {
	return r.DB.Create(fee).Error
}

func (r *MonthlyFeeRepo) List() ([]models.MonthlyFee, error) {
	var MonthlyFee []models.MonthlyFee

	if err := r.DB.Preload("Student.Family").Find(&MonthlyFee).Error; err != nil {
		return nil, err
	}
	return MonthlyFee, nil
}

func (r *MonthlyFeeRepo) CheckStudentfee(StudentID uint, month string) *models.MonthlyFee {
	var monthlyFee *models.MonthlyFee

	if err := r.DB.Where("student_id = ? AND month = ?", StudentID, month).First(&monthlyFee).Error; err != nil {
		return nil
	}
	return monthlyFee
}
