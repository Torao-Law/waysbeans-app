package categorydto

type CategoryRequest struct {
	Name string `json:"name" form:"name" validate:"required"`
}

type CategoryUpdate struct {
	Name string `json:"name" form:"name" validate:"required"`
}

type CategoryResponse struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}
