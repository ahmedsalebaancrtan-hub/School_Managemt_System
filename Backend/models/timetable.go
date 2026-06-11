package models

import "time"

type Timetable struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	ClassID   uint      `json:"class_id" gorm:"not null;index"`
	Class     Class     `json:"class" gorm:"foreignKey:ClassID"`
	SubjectID uint      `json:"subject_id" gorm:"not null;index"`
	Subject   Subject   `json:"subject" gorm:"foreignKey:SubjectID"`
	TeacherID uint      `json:"teacher_id" gorm:"not null;index"`
	Teacher   Teacher   `json:"teacher" gorm:"foreignKey:TeacherID"`
	DayOfWeek string    `json:"day_of_week" gorm:"not null"` // e.g., "Saturday", "Sunday"
	StartTime string    `json:"start_time" gorm:"not null"`  // e.g., "07:30" (24hr HH:MM format recommended)
	EndTime   string    `json:"end_time" gorm:"not null"`    // e.g., "08:15"
	Shift     string    `json:"shift" gorm:"not null"`       // "Morning" or "Afternoon"
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
