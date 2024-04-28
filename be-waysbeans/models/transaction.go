package models

import "time"

type Transaction struct {
	ID          int            `json:"id" gorm:"primary_key:auto_increment"`
	UserID      int            `json:"user_id" gorm:"type: int"`
	User        UserResponse   `json:"cart_id"`
	Carts       []CartResponse `json:"cart"`
	Status      string         `json:"status"`
	TotalAmount int            `json:"amount"`
	UpdatedAt   time.Time      `json:"updated_at"`
}

type TransactionResponse struct {
	ID     int `json:"id"`
	UserID int `json:"user_id"`
}

func (TransactionResponse) TableName() string {
	return "transactions"
}
