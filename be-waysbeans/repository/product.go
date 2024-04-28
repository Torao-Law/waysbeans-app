package repository

import (
	"waysbeans-app/models"
)

type ProductRepository interface {
	FindProducts() (*[]models.Product, error)
	FindProductPagination(page int, pageSize int) (*[]models.Product, error)
	GetProduct(ID int) (models.Product, error)
	CreateProduct(Product models.Product) (models.Product, error)
	UpdateProduct(ID int, Product models.Product) (models.Product, error)
	DeleteProduct(ID int, Product models.Product) (models.Product, error)
}

func (r *repository) FindProducts() (*[]models.Product, error) {
	var Products []models.Product
	err := r.db.Preload("Category").Order("id desc").Find(&Products).Error

	return &Products, err
}

func (r *repository) FindProductPagination(page int, pageSize int) (*[]models.Product, error) {
	var Products []models.Product
	offset := (page - 1) * pageSize
	err := r.db.Preload("Category").Offset(offset).Limit(pageSize).Find(&Products).Error

	return &Products, err
}

func (r *repository) GetProduct(ID int) (models.Product, error) {
	var Product models.Product
	err := r.db.Preload("Category").First(&Product, ID).Error

	return Product, err
}

func (r *repository) CreateProduct(Product models.Product) (models.Product, error) {
	err := r.db.Create(&Product).Error

	return Product, err
}

func (r *repository) UpdateProduct(ID int, Product models.Product) (models.Product, error) {
	err := r.db.Save(&Product).Scan(&Product).Error

	return Product, err
}

func (r *repository) DeleteProduct(ID int, Product models.Product) (models.Product, error) {
	err := r.db.Delete(&Product).Scan(&Product).Error

	return Product, err
}
