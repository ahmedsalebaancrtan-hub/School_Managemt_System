package dto

type CreateExamDto struct {
	Title        string `json:"title" binding:"required"`
	AcademicYear string `json:"academic_year" binding:"required"`
	Term         string `json:"term" binding:"required"`
}

type UpdateExamStatusDto struct {
	IsActive bool `json:"is_active" binding:"required"`
}
