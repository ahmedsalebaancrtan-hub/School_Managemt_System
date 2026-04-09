package repository

import (
	"errors"

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

func (r *FamilyRepo) GetfamilyByID(FamilyID uint) (models.Family, error) {
	var family models.Family

	if err := r.DB.Preload("Family").Where("id = ?", FamilyID).First(&family).Error; err != nil {
		return models.Family{}, errors.New("famil not found")

	}

	return family, nil
}
