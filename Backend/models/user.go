package models

import "time"

type Role string

const (
	RoleAdmin          Role = "ADMIN"
	RoleStudentAffairs Role = "StudentAffairs"
	RoleCashier        Role = "Cashier"
	RoleStudent        Role = "Student"
)

type User struct {
	ID           uint      `json:"id"`
	FullName     string    `json:"fullname"`
	EmailAddress string    `json:"emailaddress"`
	Password     string    `json:"-"`
	Role         Role      `json:"role"`
	Last_Login   time.Time `json:"last_login"`
	CreatedAt    time.Time `json:"Createdat"`
	UpdatedAt    time.Time `json:"Updatedat"`
	DeletedAt    time.Time `json:"DeletedAt"`
}
