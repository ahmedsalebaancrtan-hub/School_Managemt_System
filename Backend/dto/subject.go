package dto

type CreateSubjectDto struct {
	Title string `json:"title" binding:"required"`
	Code  string `json:"code" binding:"required"`
}

type UpdateSubjectDto struct {
	Title string `json:"title" binding:"required"`
	Code  string `json:"code" binding:"required"`
}
