package profiledto

type ProfileResponse struct {
	ID      int    `json:"id"`
	Gender  string `json:"gender"`
	Address string `json:"address"`
	Image   string `json:"image"`
}

type ProfileRequest struct {
	Gender  string `json:"gender" form:"gender"`
	Address string `json:"address" form:"address"`
	Image   string `json:"image" form:"image"`
}
