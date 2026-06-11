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
	studentRepo := repository.NewSTudentRepo(infra.DB)
	monthlyService := service.NewMonthlyFeeService(monthlyFeeRepo, studentRepo)

	return &MonthlyFeeHandler{
		MonthlyFeeService: monthlyService,
	}
}

func (h *MonthlyFeeHandler) GenerateFee(c *gin.Context) {
	var req dto.Requestdtos
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message":    "failed to Bind body request",
			"is_success": false,
			"error":      err.Error(),
		})
		return
	}

	status, err := h.MonthlyFeeService.GenerateFee(req.Month)
	if err != nil {
		c.JSON(status, gin.H{
			"is_success": false,
			"message":    err.Error(),
		})
		return
	}

	c.JSON(status, gin.H{
		"is_success": true,
		"message":    "successfully generated monthly fee rosters",
	})
}

func (h *MonthlyFeeHandler) ListMonthlyFee(c *gin.Context) {
	status, data, err := h.MonthlyFeeService.ListMonthlyFee()
	if err != nil {
		c.JSON(status, gin.H{
			"is_success": false,
			"message":    err.Error(),
		})
		return
	}

	c.JSON(status, gin.H{
		"is_success": true,
		"message":    "successfully listed monthly fee billing items",
		"data":       data,
	})
}

func (h *MonthlyFeeHandler) AcceptPayment(c *gin.Context) {
	var body dto.AcceptPyment
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"is_success": false,
			"message":    "Failed to validate incoming payment payload framework configuration",
			"error":      err.Error(),
		})
		return
	}

	status, err := h.MonthlyFeeService.AcceptPayment(body)
	if err != nil {
		c.JSON(status, gin.H{
			"is_success": false,
			"message":    err.Error(),
		})
		return
	}

	c.JSON(status, gin.H{
		"is_success": true,
		"message":    "Payment processed successfully and balance updated",
	})
}
