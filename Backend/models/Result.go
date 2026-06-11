package models

import "time"

type Result struct {
	ID            uint      `json:"id" gorm:"primaryKey"`
	ExamID        uint      `json:"exam_id" gorm:"not null;index:idx_exam_student_subject,unique"`
	Exam          Exam      `json:"exam" gorm:"foreignKey:ExamID"`
	StudentID     uint      `json:"student_id" gorm:"not null;index:idx_exam_student_subject,unique"`
	Student       Student   `json:"student" gorm:"foreignKey:StudentID"`
	SubjectID     uint      `json:"subject_id" gorm:"not null;index:idx_exam_student_subject,unique"`
	Subject       Subject   `json:"subject" gorm:"foreignKey:SubjectID"`
	MarksObtained float64   `json:"marks_obtained" gorm:"not null"`
	MaxMarks      float64   `json:"max_marks" gorm:"default:100;not null"`
	Remarks       string    `json:"remarks"` // e.g., "Gudbay" (Passed), "Haray" (Failed)
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}
