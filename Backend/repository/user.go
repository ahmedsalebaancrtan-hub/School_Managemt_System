package repository

import (
	"github.com/ahmed/capstone_project/models"
	"gorm.io/gorm"
)

type UserRepo struct {
	DB *gorm.DB
}

func RegisterRepo(db *gorm.DB) *UserRepo {
	return &UserRepo{
		DB: db,
	}
}

func (repo *UserRepo) CreateUser(data models.User) error {
	return repo.DB.Create(&data).Error
}

func (repo *UserRepo) GetUserByEmail(email string) (models.User, error) {

	var user models.User

	err := repo.DB.Where("email = ?", email).First(&user).Error

	if err != nil {
		return models.User{}, err
	}
	return user, nil
}
