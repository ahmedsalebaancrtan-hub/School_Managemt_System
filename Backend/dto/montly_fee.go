package dto

type Requestdtos struct {
	Month string `json:"month" binding:"required"`
}

type AcceptPyment struct {
	Month          string  `json:"month" binding:"required"`
	StudentID      uint    `json:"student_id" binding:"required"`
	AmountPaid     float64 `json:"amount_paid" binding:"required,gt=0"`
	DiscountAmount float64 `json:"discount_amount" binding:"gte=0"`
}
