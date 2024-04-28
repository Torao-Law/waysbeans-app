package models

type Cart struct {
	ID            int                 `json:"id" gorm:"primary_key:auto_increment"`
	ProductID     int                 `json:"product_id" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Product       ProductResponse     `json:"product"`
	TransactionID int                 `json:"transaction_id" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Transaction   TransactionResponse `json:"transaction"`
	UserID        int                 `json:"user_id" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	User          UserResponse        `json:"-"`
	Order         int                 `json:"order" gorm:"type: int"`
	SubAmount     int                 `json:"sub_amount" gorm:"type: int"`
}

type CartResponse struct {
	ID            int             `json:"id"`
	ProductID     int             `json:"product_id"`
	Product       ProductResponse `json:"product"`
	TransactionID int             `json:"transaction"`
	Order         int             `json:"order"`
	SubAmount     int             `json:"sub_amount"`
}

func (CartResponse) TableName() string {
	return `Cart`
}
