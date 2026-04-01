package infra

import (
	"github.com/ahmed/capstone_project/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDb() {

	dsn := "host=localhost user=postgres password=12345 dbname=schoolsystem  port=5432 sslmode=disable"

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}
	db.AutoMigrate(models.User{})
	DB = db
}
