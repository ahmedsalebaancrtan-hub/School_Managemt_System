package infra

import (
	"fmt"

	"github.com/ahmed/capstone_project/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDb() {
	config := Configuration

	dsn := fmt.Sprintf("host=%s user=%s password=%s port=%s dbname=%s sslmode=disable", config.DBHost, config.DBUser, config.DBPassword, config.DBPort, config.DBName)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}
	db.AutoMigrate(models.User{},
		models.Class{},
		models.Family{},
		models.Student{},
		models.StudentClass{},
		models.MonthlyFee{},
		models.Teacher{},
		models.Subject{},
		models.Timetable{},
		models.Attendance{},
		models.Exam{},
		models.Result{},
	)
	DB = db
}
