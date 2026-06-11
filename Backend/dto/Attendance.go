package dto

type StudentAttendanceItem struct {
	StudentID uint   `json:"student_id" binding:"required"`
	Status    string `json:"status" binding:"required,oneof=Present Absent Sick Leave"`
	Remarks   string `json:"remarks"`
}

type BulkAttendanceDto struct {
	ClassID uint                    `json:"class_id" binding:"required"`
	Date    string                  `json:"date" binding:"required"` // Format: "YYYY-MM-DD"
	Records []StudentAttendanceItem `json:"records" binding:"required,gt=0"`
}
