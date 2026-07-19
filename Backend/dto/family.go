package dto

type CreateFamilydto struct {
	FamilyName     string `json:"family_name" binding:"required"`
	ParentOneName  string `json:"parent_one_name" binding:"required"`
	ParentOnePhone string `json:"parent_one_phone" binding:"required,min=9,max=128"`
	ParentTwoName  string `json:"parent_two_name"`
	ParentTwoPhone string `json:"parent_two_phone"`
	Address        string `json:"address" binding:"required"`
}
