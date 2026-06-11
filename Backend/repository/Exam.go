package repository

import (
	"github.com/ahmed/capstone_project/models"
	"gorm.io/gorm"
)

type ExamRepo struct {
	DB *gorm.DB
}

func NewExamRepo(db *gorm.DB) *ExamRepo {
	return &ExamRepo{DB: db}
}

func (r *ExamRepo) CreateExam(exam models.Exam) error {
	return r.DB.Create(&exam).Error
}

func (r *ExamRepo) GetExamByID(id uint) (models.Exam, error) {
	var exam models.Exam
	err := r.DB.First(&exam, id).Error
	return exam, err
}

func (r *ExamRepo) GetAllExams() ([]models.Exam, error) {
	var exams []models.Exam
	err := r.DB.Order("created_at DESC").Find(&exams).Error
	return exams, err
}

func (r *ExamRepo) UpdateExam(exam models.Exam) error {
	return r.DB.Save(&exam).Error
}
