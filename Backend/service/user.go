package service

import (
	"errors"
	"log/slog"
	"net/http"
	"strings"
	"time"

	"github.com/ahmed/capstone_project/constant"
	"github.com/ahmed/capstone_project/dto"
	"github.com/ahmed/capstone_project/helpers"
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
		EmailAddress: email,
		Password:     data.Password,
		Role:         data.Role,
	})

	if err != nil {
		slog.Error("failed to Created New User", "error", err)
		return http.StatusInternalServerError, errors.New(constant.FailedToCreatedUser)
	}

	slog.Info("Successfully Created User")

	return http.StatusCreated, nil

}

func (svc *Userservice) LoginUser(data dto.LoginUserRequest) (response *dto.LoginUserResponse, StatusCode int, err error) {

	slog.Info("Get User by email")
	email := strings.ToLower(data.EmailAddress)

	user, err := svc.repo.GetUserByEmail(email)
	if err != nil {
		slog.Error("invalid email")
		StatusCode = http.StatusUnauthorized
		err = errors.New(constant.UnUthorisedAccess)

		return
	}

	if err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(data.Password)); err != nil {
		slog.Error("invalid password")
		StatusCode = http.StatusUnauthorized
		err = errors.New(constant.UnUthorisedAccess)
		return

	}

	AccessToken, err := helpers.GenerateJwt(user.Role, user.EmailAddress, time.Now().Add(15*time.Minute).Unix(), false)

	if err != nil {
		slog.Error("Failed to Generate access token")
		StatusCode = http.StatusInternalServerError
		err = errors.New(constant.DefaultErrorMsg)

		return
	}
	RefreshToken, err := helpers.GenerateJwt(user.Role, user.EmailAddress, time.Now().Add(72*time.Hour).Unix(), true)

	if err != nil {
		slog.Error("Failed to Generate refresh token token")
		StatusCode = http.StatusInternalServerError
		err = errors.New(constant.DefaultErrorMsg)

		return
	}

	response = &dto.LoginUserResponse{
		User:         user,
		AccessToken:  AccessToken,
		RefreshToken: RefreshToken,
	}
	StatusCode = http.StatusOK
	err = nil

	err = svc.repo.UpdatesLastLogin(user.ID)
	if err != nil {
		slog.Error("Failed to Update Last_Login")
		return nil, http.StatusUnauthorized, errors.New(constant.DefaultErrorMsg)

	}
	return

}

func (svc *Userservice) WhoAmI() bool {
	return true
}

func (svc *Userservice) RefreshToken(email string) (*dto.LoginUserResponse, int, error) {
	user, err := svc.repo.GetUserByEmail(email)
	if err != nil {
		return nil, http.StatusUnauthorized, errors.New(constant.DefaultErrorMsg)
	}

	AccessToken, err := helpers.GenerateJwt(user.Role, user.EmailAddress, time.Now().Add(15*time.Minute).Unix(), false)

	if err != nil {
		slog.Error("Failed to Generate access token")
		err = errors.New(constant.DefaultErrorMsg)

	}

	RefreshToken, err := helpers.GenerateJwt(user.Role, user.EmailAddress, time.Now().Add(72*time.Hour).Unix(), true)

	if err != nil {
		slog.Error("Failed to Generate refresh token token")
		err = errors.New(constant.DefaultErrorMsg)

	}

	return &dto.LoginUserResponse{
		User:         user,
		AccessToken:  AccessToken,
		RefreshToken: RefreshToken,
	}, http.StatusOK, nil

}
