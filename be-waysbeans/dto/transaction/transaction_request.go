package transactiondto

type CreateTransaction struct {
	ID          int `json:"id"`
	TotalAmount int `json:"total_amount" form:"total_amount"`
}

type UpdateTransaction struct {
	TotalAmount int `json:"total_amount"`
}
