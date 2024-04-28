package repository

import (
	"fmt"
	"waysbeans-app/models"
)

type TransactionRepository interface {
	FindTransactions() ([]models.Transaction, error)
	GetTransaction(ID int) (models.Transaction, error)
	GetTransactionByUser(IDUser int) (models.Transaction, error)
	CreateTransaction(Transaction models.Transaction) (models.Transaction, error)
	UpdateTransaction(Transaction models.Transaction) (models.Transaction, error)
	DeleteTransaction(ID int, Transaction models.Transaction) (models.Transaction, error)
}

func (r *repository) FindTransactions() ([]models.Transaction, error) {
	var Transaction []models.Transaction
	err := r.db.Find(&Transaction).Error

	return Transaction, err
}

func (r *repository) GetTransaction(ID int) (models.Transaction, error) {
	var Transaction models.Transaction
	err := r.db.First(&Transaction, ID).Error

	return Transaction, err
}

func (r *repository) GetTransactionByUser(IDUser int) (models.Transaction, error) {
	var Transaction models.Transaction
	err := r.db.Where("user_id = ? AND Status = ?", IDUser, "new").Preload("User").First(&Transaction).Error

	return Transaction, err
}

func (r *repository) CreateTransaction(Transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Create(&Transaction).Error

	return Transaction, err
}

func (r *repository) UpdateTransaction(Transaction models.Transaction) (models.Transaction, error) {
	var carts []models.Cart
	err := r.db.Preload("Product").Where("transaction_id = ?", Transaction.ID).Find(&carts).Error

	fmt.Println("ini transaksi", Transaction)

	if err != nil {
		return Transaction, err
	}

	for _, cart := range carts {
		var product models.Product
		cartID := cart.Product.ID
		r.db.First(&product, cartID)

		product.Qty = product.Qty - cart.Order
		r.db.Save(&product)
	}

	err = r.db.Save(&Transaction).Error

	return Transaction, err
}

func (r *repository) DeleteTransaction(ID int, Transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Delete(&Transaction).Error

	return Transaction, err
}
