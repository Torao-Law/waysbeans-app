package transactiondto

type TransactionResponse struct {
	ID          int    `json:"id"`
	User        string `json:"User"`
	Status      string `json:"status"`
	TotalAmount int    `json:"amount"`
}
