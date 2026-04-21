package handler

import (
	"net/http"

	"github.com/ahmed/capstone_project/dto"
	"github.com/ahmed/capstone_project/infra"
	"github.com/ahmed/capstone_project/repository"
	"github.com/ahmed/capstone_project/service"
	"github.com/gin-gonic/gin"
)

type MonthlyFeeHandler struct {
	MonthlyFeeService *service.MonthlyFeeService
}

func NewMonthlyFeeHandler() *MonthlyFeeHandler {
	monthlyFeeRepo := repository.NewMonthlyFeeRepo(infra.DB)
	StudentRepo := repository.NewSTudentRepo(infra.DB)
	Monthlyservice := service.NewMonthlyFeeService(monthlyFeeRepo, StudentRepo)

	return &MonthlyFeeHandler{
		MonthlyFeeService: Monthlyservice,
	}

}

func (h *MonthlyFeeHandler) GenerateFee(c *gin.Context) {
	var req dto.Requestdtos

	if err := c.ShouldBindBodyWithJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"messege":    "failed to Bind  body request",
			"is_success": false,
			"error":      err.Error(),
		})
		return

	}

	status, err := h.MonthlyFeeService.GenerateFee(req.Month)
	if err != nil {
		c.JSON(status, gin.H{
			"is_success": false,
			"messege":    err.Error(),
		})
		return
	}

	c.JSON(status, gin.H{
		"is_success": true,
		"messege":    "successfully generated monthly fee",
	})
}
func (h *MonthlyFeeHandler) ListMonthlyFee(c *gin.Context) {

	status, data, err := h.MonthlyFeeService.ListMonthlyFee()
	if err != nil {
		c.JSON(status, gin.H{
			"is_success": false,
			"messege":    err.Error(),
		})
		return
	}

	c.JSON(status, gin.H{
		"is_success": true,
		"messege":    "successfully Listed monthly fee",
		"data":       data,
	})
}
