package models

import "time"

type Product struct {
	ID          int              `json:"id" gorm:"primaryKey;autoIncrement"`
	Name        string           `json:"name" form:"name" gorm:"type:varchar(255)"`
	Description string           `json:"description" form:"description" gorm:"type:varchar(255)"`
	Qty         int              `json:"qty" form:"qty" gorm:"type:int"`
	Price       int              `json:"price" form:"price" gorm:"type:int"`
	Image       string           `json:"image" form:"image" gorm:"type:varchar(255)"`
	CategoryID  int              `json:"category_id"`
	Category    CategoryResponse `json:"category"`
	CreatedAt   time.Time        `json:"created_at"`
	UpdatedAt   time.Time        `json:"updated_at"`
}

type ProductResponse struct {
	ID          int              `json:"id"`
	Name        string           `json:"name"`
	Description string           `json:"description"`
	CategoryID  int              `json:"category_id"`
	Category    CategoryResponse `json:"category"`
	Price       int              `json:"price"`
	Qty         int              `json:"qty"`
	Image       string           `json:"image"`
}

func (ProductResponse) TableName() string {
	return "Products"
}
