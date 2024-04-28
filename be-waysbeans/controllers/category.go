package controllers

import (
	"net/http"
	"strconv"
	categorydto "waysbeans-app/dto/category"
	resultdto "waysbeans-app/dto/result"
	"waysbeans-app/models"
	"waysbeans-app/repository"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

type categoryControllers struct {
	categoryRepostory repository.CategoryRepository
}

func CategoryContrroller(CategoryRepository repository.CategoryRepository) *categoryControllers {
	return &categoryControllers{CategoryRepository}
}

func (h *categoryControllers) CreateCategory(c *gin.Context) {
	c.Header(c.ContentType(), gin.MIMEJSON)

	request := new(categorydto.CategoryRequest)
	if err := c.Bind(&request); err != nil {
		c.JSON(http.StatusUnprocessableEntity, resultdto.ErrorResult{
			Code:    http.StatusUnprocessableEntity,
			Message: err.Error(),
		})
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	category := models.Category{
		Name: request.Name,
	}

	data, err := h.categoryRepostory.CreateCategory(category)

	if err != nil {
		c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		})
	}

	c.JSON(http.StatusCreated, resultdto.SuccessResult{
		Code:    http.StatusCreated,
		Message: "SUCCESS",
		Data:    convertCategoryResponse(data),
	})
}

func (h *categoryControllers) FindCategories(c *gin.Context) {
	data, err := h.categoryRepostory.FindCategories()

	if err != nil {
		c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		})
	}

	c.JSON(http.StatusOK, resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "SUCCESS",
		Data:    convertMultipleCategoryResponse(&data),
	})
}

func (h *categoryControllers) GetCategory(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))

	data, err := h.categoryRepostory.GetCategory(id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		})
	}

	c.JSON(http.StatusOK, resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "SUCCESS",
		Data:    data,
	})
}

func (r *categoryControllers) UpdateCategory(c *gin.Context) {
	c.Header(c.ContentType(), "application/json")
	request := new(categorydto.CategoryUpdate)
	if err := c.Bind(&request); err != nil {
		c.JSON(http.StatusUnprocessableEntity, resultdto.ErrorResult{
			Code:    http.StatusUnprocessableEntity,
			Message: err.Error(),
		})
	}

	id, _ := strconv.Atoi(c.Param("id"))

	category := models.Category{
		ID:   id,
		Name: request.Name,
	}

	data, err := r.categoryRepostory.UpdateCategory(id, category)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, resultdto.ErrorResult{
			Code:    http.StatusUnprocessableEntity,
			Message: err.Error(),
		})
	}

	c.JSON(http.StatusOK, resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "SUCCESS",
		Data:    convertCategoryResponse(data),
	})
}

func (r *categoryControllers) DeleteCategory(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	category, err := r.categoryRepostory.GetCategory(id)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, resultdto.ErrorResult{
			Code:    http.StatusUnprocessableEntity,
			Message: err.Error(),
		})
	}

	data, err := r.categoryRepostory.DeleteCategory(id, category)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, resultdto.ErrorResult{
			Code:    http.StatusUnprocessableEntity,
			Message: err.Error(),
		})
	}

	c.JSON(http.StatusOK, resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "SUCCESS",
		Data:    convertCategoryResponse(data),
	})
}

func convertCategoryResponse(model models.Category) categorydto.CategoryResponse {
	return categorydto.CategoryResponse{
		ID:   model.ID,
		Name: model.Name,
	}
}

func convertMultipleCategoryResponse(Category *[]models.Category) *[]categorydto.CategoryResponse {
	var CategoryResponse []categorydto.CategoryResponse

	for _, category := range *Category {
		CategoryResponse = append(CategoryResponse, convertCategoryResponse(category))
	}

	return &CategoryResponse
}
