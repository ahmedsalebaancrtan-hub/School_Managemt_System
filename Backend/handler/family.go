package handler

import (
	"net/http"

	"github.com/ahmed/capstone_project/dto"
	"github.com/ahmed/capstone_project/infra"
	"github.com/ahmed/capstone_project/repository"
	"github.com/ahmed/capstone_project/service"
	"github.com/gin-gonic/gin"
)

type FamilyHandler struct {
	FamilyService *service.FamilyService
}

func RegisterFamilyHandler() *FamilyHandler {

	Familyrepo := repository.NewFamilyRepo(infra.DB)
	Familyservice := service.NewFamilyService(*Familyrepo)

	return &FamilyHandler{
		FamilyService: Familyservice,
	}

}

func (h *FamilyHandler) CreateFamily(c *gin.Context) {

	var body dto.CreateFamilydto

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"messege":    "failed to Bind  body request",
			"is_success": false,
			"error":      err.Error(),
		})
		return

	}

	StatusCode, err := h.FamilyService.CreateFamily(body)

	if err != nil {
		c.JSON(StatusCode, gin.H{
			"is_success": false,
			"messege":    err.Error(),
		})
		return
	}

	c.JSON(StatusCode, gin.H{
		"is_success": true,
		"messege":    "family Created successfully",
	})
}
