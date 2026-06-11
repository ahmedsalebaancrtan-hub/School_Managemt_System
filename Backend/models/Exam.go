package models

import "time"

type Exam struct {
	ID           uint      `json:"id" gorm:"primaryKey"`
	Title        string    `json:"title" gorm:"not null"`         // e.g., "Midterm Exam", "Final Exam"
	AcademicYear string    `json:"academic_year" gorm:"not null"` // e.g., "2025/2026"
	Term         string    `json:"term" gorm:"not null"`          // e.g., "Term 1", "Term 2"
	IsActive     bool      `json:"is_active" gorm:"default:true"` // Active exams allow score entry
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}
