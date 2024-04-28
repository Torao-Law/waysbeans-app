package repository

import (
	"waysbeans-app/models"
)

type CartRepository interface {
	FindCarts(IDUser int, idTransaction int) ([]models.Cart, error)
	GetCart(ID int, IDuser int) (models.Cart, error)
	GetCartByProductId(IDProduct int, IDUser int) (models.Cart, error)
	CreateCart(Cart models.Cart) (models.Cart, error)
	UpdateCart(ID int, Cart models.Cart) (models.Cart, error)
	DeleteCart(Cart models.Cart) (models.Cart, error)
	GetTransactionByUserID(ID int, status string) (models.Transaction, error)
}

func (r *repository) FindCarts(IDUser int, idTransaction int) ([]models.Cart, error) {
	var carts []models.Cart
	err := r.db.Preload("Product").Preload("Product.Category").Where("user_id = ? AND transaction_id = ?", IDUser, idTransaction).Find(&carts).Error

	return carts, err
}

func (r *repository) GetCart(ID int, IDuser int) (models.Cart, error) {
	var cart models.Cart
	err := r.db.Where("id = ?", ID).Where("user_id = ?", IDuser).First(&cart).Error

	return cart, err
}

func (r *repository) GetCartByProductId(IDProduct int, IDUser int) (models.Cart, error) {
	var cart models.Cart
	err := r.db.Where("user_id = ?", IDUser).Where("product_id = ?", IDProduct).First(&cart).Error

	return cart, err
}

func (r *repository) CreateCart(Cart models.Cart) (models.Cart, error) {
	err := r.db.Create(&Cart).Preload("Product").Error

	return Cart, err
}

func (r *repository) UpdateCart(ID int, Cart models.Cart) (models.Cart, error) {
	err := r.db.Model(&Cart).Where("id = ?", ID).Updates(map[string]interface{}{"order": Cart.Order, "sub_amount": Cart.SubAmount}).Error

	return Cart, err
}

func (r *repository) DeleteCart(Cart models.Cart) (models.Cart, error) {
	err := r.db.Delete(&Cart).Error

	return Cart, err
}

func (r *repository) GetTransactionByUserID(ID int, status string) (models.Transaction, error) {
	var Transaction models.Transaction
	err := r.db.Where("user_id = ?", ID).Where("status = ?", status).First(&Transaction).Error

	return Transaction, err
}
