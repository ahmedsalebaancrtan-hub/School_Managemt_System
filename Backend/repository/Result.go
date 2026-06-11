package repository

import (
	"github.com/ahmed/capstone_project/models"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type ResultRepo struct {
	DB *gorm.DB
}

func NewResultRepo(db *gorm.DB) *ResultRepo {
	return &ResultRepo{DB: db}
}

// SaveBulkResults writes or updates student scores safely inside a transaction block
func (r *ResultRepo) SaveBulkResults(records []models.Result) error {
	return r.DB.Transaction(func(tx *gorm.DB) error {
		return tx.Clauses(clause.OnConflict{
			Columns:   []clause.Column{{Name: "exam_id"}, {Name: "student_id"}, {Name: "subject_id"}},
			DoUpdates: clause.AssignmentColumns([]string{"marks_obtained", "max_marks", "remarks", "updated_at"}),
		}).Create(&records).Error
	})
}

func (r *ResultRepo) GetStudentReportCard(studentID uint, examID uint) ([]models.Result, error) {
	var reports []models.Result
	err := r.DB.Preload("Subject").Preload("Exam").
		Where("student_id = ? AND exam_id = ?", studentID, examID).Find(&reports).Error
	return reports, err
}
