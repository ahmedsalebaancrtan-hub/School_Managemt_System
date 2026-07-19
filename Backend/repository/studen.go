package repository

import (
	"github.com/ahmed/capstone_project/models"
	"gorm.io/gorm"
)

type StudentRepo struct {
	DB *gorm.DB
}

func NewSTudentRepo(db *gorm.DB) *StudentRepo {
	return &StudentRepo{
		DB: db,
	}
}

func (r *StudentRepo) CreateStudent(student models.Student) error {
	return r.DB.Create(&student).Error
}
func (r *StudentRepo) ListStudent() ([]models.Student, error) {
	var students []models.Student

	// Preload("Family") instructs GORM to fetch the related family data
	if err := r.DB.Preload("Family").Find(&students).Error; err != nil {
		return nil, err
	}

	return students, nil
}

func (r *StudentRepo) GetStudentByID(StudentID uint) (models.Student, error) {
	var student models.Student

	// Added Preload("Family") here as well so individual lookups have it
	err := r.DB.Preload("Family").Where("id = ?", StudentID).First(&student).Error
	if err != nil {
		return models.Student{}, err
	}

	// FIXED: Changed from models.Student{} to student so it actually returns the data
	return student, nil
}
