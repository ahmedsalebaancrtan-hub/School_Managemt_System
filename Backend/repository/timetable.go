package repository

import (
	"github.com/ahmed/capstone_project/models"
	"gorm.io/gorm"
)

type TimetableRepo struct {
	DB *gorm.DB
}

func NewTimetableRepo(db *gorm.DB) *TimetableRepo {
	return &TimetableRepo{DB: db}
}

func (r *TimetableRepo) CreateSlot(slot models.Timetable) error {
	return r.DB.Create(&slot).Error
}

// CheckTeacherConflict looks for overlapping times for a specific teacher on a specific day
func (r *TimetableRepo) CheckTeacherConflict(teacherID uint, day string, startTime string, endTime string) (bool, error) {
	var count int64
	err := r.DB.Model(&models.Timetable{}).
		Where("teacher_id = ? AND day_of_week = ? AND ((start_time <= ? AND end_time > ?) OR (start_time < ? AND end_time >= ?))",
			teacherID, day, startTime, startTime, endTime, endTime).
		Count(&count).Error

	return count > 0, err
}

// GetClassTimetable pulls the entire schedule for a specific room/class, pre-loading relation text
func (r *TimetableRepo) GetClassTimetable(classID uint) ([]models.Timetable, error) {
	var timetable []models.Timetable
	err := r.DB.Preload("Subject").Preload("Teacher").Where("class_id = ?", classID).Find(&timetable).Error
	return timetable, err
}
