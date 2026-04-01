package service

import (
	"errors"
	"log/slog"
	"net/http"
	"strings"

	"github.com/ahmed/capstone_project/constant"
	"github.com/ahmed/capstone_project/dto"
	"github.com/ahmed/capstone_project/models"
	"github.com/ahmed/capstone_project/repository"
	"golang.org/x/crypto/bcrypt"
)

type Userservice struct {
	repo *repository.UserRepo
}

func RegisterService(repo *repository.UserRepo) *Userservice {
	return &Userservice{
		repo: repo,
	}
}

func (svc *Userservice) CreateUser(data *dto.CreateUserDto) (int, error) {

	email := strings.ToLower(data.EmailAddress)
	_, err := svc.repo.GetUserByEmail(email)

	if err == nil {
		slog.Error("User with that email already exists")
		return http.StatusConflict, errors.New("User with this email already exist")

	}

	slog.Info("Hashing user password")

	hashbytes, err := bcrypt.GenerateFromPassword([]byte(data.Password), bcrypt.DefaultCost)
	if err != nil {
		slog.Error("failed to hash a password")
		return http.StatusInternalServerError, errors.New(constant.DefaultErrorMsg)
	}

	data.Password = string(hashbytes)

	slog.Info("Created user")

	err = svc.repo.CreateUser(models.User{
		FullName:     data.FullName,
		EmailAddress: data.EmailAddress,
		Password:     data.Password,
	})

	if err != nil {
		slog.Error("failed to Created New User", "error", err)
		return http.StatusInternalServerError, errors.New(constant.FailedToCreatedUser)
	}

	slog.Info("Successfully Created User")

	return http.StatusCreated, nil

}
