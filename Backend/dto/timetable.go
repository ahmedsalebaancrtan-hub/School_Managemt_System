package dto

type CreateTimetableDto struct {
	ClassID   uint   `json:"class_id" binding:"required"`
	SubjectID uint   `json:"subject_id" binding:"required"`
	TeacherID uint   `json:"teacher_id" binding:"required"`
	DayOfWeek string `json:"day_of_week" binding:"required"` // Validation should check Sat-Thu
	StartTime string `json:"start_time" binding:"required"`  // Format: "HH:MM"
	EndTime   string `json:"end_time" binding:"required"`    // Format: "HH:MM"
	Shift     string `json:"shift" binding:"required,oneof=Morning Afternoon"`
}
