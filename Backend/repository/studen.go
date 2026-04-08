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
