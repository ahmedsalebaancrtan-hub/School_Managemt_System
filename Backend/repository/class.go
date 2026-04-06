package repository

import (
	"github.com/ahmed/capstone_project/models"
	"gorm.io/gorm"
)

type ClassRepo struct {
	DB *gorm.DB
}

func NewClassRegister(db *gorm.DB) ClassRepo {
	return ClassRepo{
		DB: db,
	}
}

func (r *ClassRepo) CreateClass(data models.Class) error {
	return r.DB.Create(&data).Error

}
