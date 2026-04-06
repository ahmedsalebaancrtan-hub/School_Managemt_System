package dto

type CreateClassdto struct {
	Title        string `json:"title" binding:"required"`
	AcademicYear string `json:"AcademicYear" binding:"required"`
}
