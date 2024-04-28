package models

import "time"

type Category struct {
	ID        int               `json:"id" gorm:"primaryKey;autoIncrement"`
	Name      string            `json:"name" gorm:"type:varchar(100)"`
	Products  []ProductResponse `json:"products"`
	CreatedAt time.Time         `json:"created_at"`
	UpdatedAt time.Time         `json:"updated_at"`
}

type CategoryResponse struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

func (CategoryResponse) TableName() string {
	return "Categories"
}
