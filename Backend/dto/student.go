package dto

type CreateStudentDto struct {
	FirstName  string `json:"first_name" bindig:"required"`
	MiddleName string `json:"middle_name" bindig:"required"`
	LastName   string `json:"last_name" bindig:"required"`
	FamilyID   uint   `json:"familyId" bindig:"required"`
}
