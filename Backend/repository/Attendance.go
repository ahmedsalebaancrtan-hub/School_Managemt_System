package repository

import (
	"github.com/ahmed/capstone_project/models"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type AttendanceRepo struct {
	DB *gorm.DB
}

func NewAttendanceRepo(db *gorm.DB) *AttendanceRepo {
	return &AttendanceRepo{DB: db}
}

// SaveBulkAttendance processes records inside an atomic database transaction
func (r *AttendanceRepo) SaveBulkAttendance(records []models.Attendance) error {
	return r.DB.Transaction(func(tx *gorm.DB) error {
		// OnConflict allows updates if staff resubmits a corrected roll call for that day
		return tx.Clauses(clause.OnConflict{
			Columns:   []clause.Column{{Name: "student_id"}, {Name: "date"}},
			DoUpdates: clause.AssignmentColumns([]string{"status", "remarks", "created_by_id", "updated_at"}),
		}).Create(&records).Error
	})
}

func (r *AttendanceRepo) GetClassAttendanceByDate(classID uint, date string) ([]models.Attendance, error) {
	var logs []models.Attendance
	err := r.DB.Preload("Student").Where("class_id = ? AND date = ?", classID, date).Find(&logs).Error
	return logs, err
}
