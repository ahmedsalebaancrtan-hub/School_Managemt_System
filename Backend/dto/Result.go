package dto

type StudentMarkItem struct {
	StudentID     uint    `json:"student_id" binding:"required"`
	MarksObtained float64 `json:"marks_obtained" binding:"required,gte=0"`
	Remarks       string  `json:"remarks"`
}

type BulkResultDto struct {
	ExamID    uint              `json:"exam_id" binding:"required"`
	SubjectID uint              `json:"subject_id" binding:"required"`
	MaxMarks  float64           `json:"max_marks" binding:"required,gt=0"`
	Grades    []StudentMarkItem `json:"grades" binding:"required,gt=0"`
}
