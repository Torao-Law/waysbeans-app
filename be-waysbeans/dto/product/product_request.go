package productdto

import "waysbeans-app/models"

type CreateProduct struct {
	Name        string `json:"name" form:"name" validate:"required"`
	Description string `json:"description" form:"description" validate:"required"`
	Price       int    `json:"price" form:"price" validate:"required"`
	Qty         int    `json:"qty" form:"qty" validate:"required"`
	Image       string `json:"image" form:"image" validate:"required"`
	CategoryID  int    `json:"category_id" form:"category_id" validate:"required"`
}

type UpdateProduct struct {
	Name        string `json:"name" form:"name"`
	Description string `json:"description" form:"description"`
	Price       int    `json:"price" form:"price"`
	Qty         int    `json:"qty" form:"qty"`
	Image       string `json:"image" form:"image"`
	CategoryID  int    `json:"category_id" form:"category_id"`
}

type ProductResponse struct {
	ID          int                     `json:"id"`
	Name        string                  `json:"name"`
	Category    models.CategoryResponse `json:"category"`
	Description string                  `json:"description"`
	Qty         int                     `json:"qty"`
	Price       int                     `json:"price"`
	Image       string                  `json:"image"`
}
