package models

import "time"

type User struct {
	ID           uint      `json:"id"`
	FullName     string    `json:"fullname"`
	EmailAddress string    `json:"emailaddress"`
	Password     string    `json:"-"`
	Last_Login   time.Time `json:"last_login"`
	CreatedAt    time.Time `json:"Createdat"`
	UpdatedAt    time.Time `json:"Updatedat"`
	DeletedAt    time.Time `json:"DeletedAt"`
}
