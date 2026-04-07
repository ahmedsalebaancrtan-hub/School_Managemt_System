package repository

import (
	"github.com/ahmed/capstone_project/models"
	"gorm.io/gorm"
)

type FamilyRepo struct {
	DB *gorm.DB
}

func NewFamilyRepo(db *gorm.DB) *FamilyRepo {
	return &FamilyRepo{
		DB: db,
	}
}

func (r *FamilyRepo) CreateFamily(data models.Family) error {
	return r.DB.Create(&data).Error
}
