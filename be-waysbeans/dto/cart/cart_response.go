package cartdto

type CartResponse struct {
	ID            int    `json:"id"`
	Product       string `json:"product"`
	Price         int    `json:"price"`
	Image         string `json:"image"`
	Category      string `json:"category"`
	TransactionID int    `json:"transaction_id"`
	SubAmount     int    `json:"sub_amount"`
	Order         int    `json:"order"`
	UserID        int    `json:"user_id"`
}
