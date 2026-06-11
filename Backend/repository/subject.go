package repository

import (
	"github.com/ahmed/capstone_project/models"
	"gorm.io/gorm"
)

type SubjectRepo struct {
	DB *gorm.DB
}

func NewSubjectRepo(db *gorm.DB) *SubjectRepo {
	return &SubjectRepo{DB: db}
}

func (r *SubjectRepo) CreateSubject(data models.Subject) error {
	return r.DB.Create(&data).Error
}

func (r *SubjectRepo) GetSubjectByID(id uint) (models.Subject, error) {
	var subject models.Subject
	err := r.DB.First(&subject, id).Error
	return subject, err
}

func (r *SubjectRepo) GetAllSubjects() ([]models.Subject, error) {
	var subjects []models.Subject
	err := r.DB.Find(&subjects).Error
	return subjects, err
}

func (r *SubjectRepo) UpdateSubject(subject models.Subject) error {
	return r.DB.Save(&subject).Error
}
