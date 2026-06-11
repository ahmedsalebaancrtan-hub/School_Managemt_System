package models

import "time"

type Subject struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Title     string    `json:"title" gorm:"not null"`             // e.g., "Tarbiya Islamiyah"
	Code      string    `json:"code" gorm:"unique;not null;index"` // e.g., "ISL-01"
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
