package repository

import "waysbeans-app/models"

type CategoryRepository interface {
	CreateCategory(Category models.Category) (models.Category, error)
	FindCategories() ([]models.Category, error)
	GetCategory(ID int) (models.Category, error)
	UpdateCategory(ID int, Category models.Category) (models.Category, error)
	DeleteCategory(ID int, Category models.Category) (models.Category, error)
}

func (r *repository) CreateCategory(Category models.Category) (models.Category, error) {
	err := r.db.Create(&Category).Error

	return Category, err
}

func (r *repository) FindCategories() ([]models.Category, error) {
	var Categories []models.Category
	err := r.db.Find(&Categories).Error

	return Categories, err
}

func (r *repository) GetCategory(ID int) (models.Category, error) {
	var category models.Category
	err := r.db.Preload("Products").First(&category, ID).Error

	return category, err
}

func (r *repository) UpdateCategory(ID int, Category models.Category) (models.Category, error) {
	err := r.db.Model(&Category).Where("ID = ?", ID).Updates(Category).Error

	return Category, err
}

func (r *repository) DeleteCategory(ID int, Category models.Category) (models.Category, error) {
	err := r.db.Delete(&Category, ID).Scan(ID).Error

	return Category, err
}
