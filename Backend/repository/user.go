package repository

import (
	"time"

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

	err := repo.DB.Where("email_address = ?", email).First(&user).Error

	if err != nil {
		return models.User{}, err
	}
	return user, nil
}

func (repo *UserRepo) UpdatesLastLogin(UserID uint) error {

	// err := repo.DB.Model(&models.User{}).Update("Last_Login", time.Now()).Error

	err := repo.DB.Model(&models.User{}).Where("id = ?", UserID).Updates(map[string]interface{}{
		"Last_Login": time.Now(),
	}).Error

	if err != nil {
		return err

	}
	return nil
}
