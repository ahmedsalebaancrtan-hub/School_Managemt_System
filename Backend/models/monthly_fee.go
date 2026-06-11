package models

import "time"

type MonthlyFee struct {
	ID               uint      `json:"id"`
	StudentID        uint      `json:"student_id" gorm:"index"`
	Student          *Student  `json:"student,omitempty" gorm:"foreignkey:StudentID"`
	Month            string    `json:"month" gorm:"uniqueIndex:idx_student_month"`
	Amount           float64   `json:"amount"`
	PaidAmount       float64   `json:"paid_amount"`
	DiscountAmount   float64   `json:"discount_amount"`
	RemainingBalance float64   `json:"remaining_balance"`
	IsPaid           bool      `json:"is_paid" gorm:"index"`
	PaidAt           time.Time `json:"paid_at,omitempty"`
	Createdat        time.Time `json:"Createdat"`
	UpdatedAt        time.Time `json:"updatedat"`
}
