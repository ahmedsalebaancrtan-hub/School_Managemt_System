package models

import "time"

type Attendance struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	StudentID   uint      `json:"student_id" gorm:"not null;index:idx_student_date,unique"`
	Student     Student   `json:"student" gorm:"foreignKey:StudentID"`
	ClassID     uint      `json:"class_id" gorm:"not null;index"`
	Date        time.Time `json:"date" gorm:"type:date;not null;index:idx_student_date,unique"` // Unique index prevents duplicate logs per day
	Status      string    `json:"status" gorm:"not null"`                                       // "Present", "Absent", "Sick", "Leave"
	Remarks     string    `json:"remarks"`                                                      // e.g., "Parent called" or "No excuse"
	CreatedByID uint      `json:"created_by_id" gorm:"not null"`                                // Tracks which staff member logged it
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
