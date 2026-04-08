package models

import "time"

type Student struct {
	ID         uint      `json:"id"`
	FirstName  string    `json:"first_name"`
	MiddleName string    `json:"middle_name"`
	LastName   string    `json:"last_name"`
	CreatedAt  time.Time `json:"Createdat"`
	UpdatedAt  time.Time `json:"UpdatedAt"`
	FamilyID   uint      `json:"familyId"`
	Family     Family    `json:"family" gorm:"foreignkey:FamilyID"`
}
