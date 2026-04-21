package dto

type Requestdtos struct {
	Month string `json:"month" binding:"required"`
}
