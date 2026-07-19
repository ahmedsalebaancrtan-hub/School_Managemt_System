package service

import (
	"errors"
	"log/slog"
	"net/http"

	"github.com/ahmed/capstone_project/constant"
	"github.com/ahmed/capstone_project/dto"
	"github.com/ahmed/capstone_project/models"
	"github.com/ahmed/capstone_project/repository"
)

type FamilyService struct {
	FamilyRepo repository.FamilyRepo
}

func NewFamilyService(FamilyRepo repository.FamilyRepo) *FamilyService {
	return &FamilyService{
		FamilyRepo: FamilyRepo,
	}
}

func (svc *FamilyService) CreateFamily(data dto.CreateFamilydto) (int, error) {

	NewFamily := models.Family{
		FamilyName:     data.FamilyName,
		ParentOneName:  data.ParentOneName,
		ParentOnePhone: data.ParentOnePhone,
		ParentTwoName:  nilIfEmpty(data.ParentTwoName),
		ParentTwoPhone: nilIfEmpty(data.ParentTwoPhone),
		Address:        data.Address,
	}

	err := svc.FamilyRepo.CreateFamily(NewFamily)

	if err != nil {
		slog.Error("❌Failed to create family ", "error", err)
		return http.StatusInternalServerError, errors.New(constant.DefaultErrorMsg)
	}

	return http.StatusCreated, nil

}

func (svc *FamilyService) ListFamily() (int, []models.Family, error) {
	data, err := svc.FamilyRepo.ListFamily()
	if err != nil {
		slog.Error("❌Failed to list family ", "error", err)
		return http.StatusInternalServerError, nil, errors.New(constant.DefaultErrorMsg)
	}

	return http.StatusOK, data, nil
}

// nilIfEmpty returns nil if the string is empty, otherwise returns a pointer to it.
// Used so optional fields serialize as null (not "") in JSON.
func nilIfEmpty(s string) *string {
	if s == "" {
		return nil
	}
	return &s
}
