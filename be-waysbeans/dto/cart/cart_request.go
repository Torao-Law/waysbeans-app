package cartdto

type CartRequest struct {
	ProductID int `json:"product_id" form:"product_id" validate:"required"`
	// TransactionID int `json:"transaction_id" form:"transaction_id" validate:"required"`
	Order     int `json:"order" form:"order" validate:"required"`
	SubAmount int `json:"sub_amount" form:"sub_amount" validate:"required"`
}

type CartUpdate struct {
	Order     int `json:"order" form:"order`
	SubAmount int `json:"sub_amount" form:"sub_amount"`
}
