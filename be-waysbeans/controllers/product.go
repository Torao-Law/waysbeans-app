package controllers

import (
	"fmt"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"
	productdto "waysbeans-app/dto/product"
	resultdto "waysbeans-app/dto/result"
	"waysbeans-app/models"
	"waysbeans-app/repository"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

type productHandlers struct {
	ProductRepository repository.ProductRepository
}

func ProductHandlers(ProductRepository repository.ProductRepository) *productHandlers {
	return &productHandlers{ProductRepository}
}

// find all data products
func (h *productHandlers) FindProducts(c *gin.Context) {
	c.Header("Content-type", "application/json")

	page, _ := strconv.Atoi(c.Query("page"))
	pageSize, _ := strconv.Atoi(c.Query("pageSize"))

	var data *[]models.Product
	var err error

	if page != 0 || pageSize != 0 {
		data, err = h.ProductRepository.FindProductPagination(page, pageSize)
	} else {
		data, err = h.ProductRepository.FindProducts()
	}

	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	response := resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "SUCCESS",
		Data:    convertMultipleProductResponse(data),
	}

	c.JSON(http.StatusOK, response)
}

// find one data product
func (h *productHandlers) GetProduct(c *gin.Context) {
	c.Header("Content-type", "application/json")

	id, _ := strconv.Atoi(c.Param("id"))
	data, err := h.ProductRepository.GetProduct(id)

	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	response := resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "SUCCESS",
		Data:    convertProductResponse(data),
	}

	c.JSON(http.StatusOK, response)
}

// Create new product
func (h *productHandlers) CreateProduct(c *gin.Context) {
	name := c.Request.FormValue("name")
	description := c.Request.FormValue("description")
	categoryId, _ := strconv.Atoi(c.Request.FormValue("category_id"))
	qty, _ := strconv.Atoi(c.Request.FormValue("qty"))
	price, _ := strconv.Atoi(c.Request.FormValue("price"))

	dataFile, _ := c.Get("dataFile")

	data := productdto.CreateProduct{
		Name:        name,
		Description: description,
		Qty:         qty,
		Price:       price,
		Image:       dataFile.(string),
		CategoryID:  categoryId,
	}

	validation := validator.New()
	err := validation.Struct(data)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	cld, _ := cloudinary.NewFromParams(os.Getenv("CLOUD_NAME"), os.Getenv("API_KEY"), os.Getenv("API_SECRET"))
	resCloud, err := cld.Upload.Upload(c, "uploads/"+data.Image, uploader.UploadParams{
		PublicID: strings.Split(data.Image, ".")[0],
		Folder:   "waysbeans-app",
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		})
	}

	product := models.Product{
		Name:        data.Name,
		Description: data.Description,
		Qty:         data.Qty,
		Price:       data.Price,
		Image:       resCloud.SecureURL,
		CategoryID:  data.CategoryID,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	responseCreate, err := h.ProductRepository.CreateProduct(product)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	response, err := h.ProductRepository.GetProduct(responseCreate.ID)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	responseJson := resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "SUCCESS",
		Data:    convertProductResponse(response),
	}

	c.JSON(http.StatusOK, responseJson)

}

// Update product
func (h *productHandlers) UpdateProduct(c *gin.Context) {
	name := c.Request.FormValue("name")
	description := c.Request.FormValue("description")
	categoryId, _ := strconv.Atoi(c.Request.FormValue("category_id"))
	qty, _ := strconv.Atoi(c.Request.FormValue("qty"))
	price, _ := strconv.Atoi(c.Request.FormValue("price"))

	dataFile, _ := c.Get("dataFile")

	fmt.Println(categoryId)

	request := productdto.UpdateProduct{
		Name:        name,
		Description: description,
		Price:       price,
		CategoryID:  categoryId,
		Qty:         qty,
		Image:       dataFile.(string),
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	id, _ := strconv.Atoi(c.Param("id"))

	product, err := h.ProductRepository.GetProduct(id)
	if err != nil {
		c.JSON(
			http.StatusBadRequest,
			resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
		return
	}

	if request.Name != "" {
		product.Name = request.Name
	}
	if request.Description != "" {
		product.Description = request.Description
	}
	if request.Image != "" {
		cld, _ := cloudinary.NewFromParams(os.Getenv("CLOUD_NAME"), os.Getenv("API_KEY"), os.Getenv("API_SECRET"))
		resCloud, err := cld.Upload.Upload(c, "uploads/"+request.Image, uploader.UploadParams{
			PublicID: strings.Split(request.Image, ".")[0],
			Folder:   "waysbeans-app",
		})

		if err != nil {
			c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{
				Code:    http.StatusInternalServerError,
				Message: err.Error(),
			})
		}

		product.Image = resCloud.SecureURL
	}
	if request.Qty != 0 {
		product.Qty = request.Qty
	}
	if request.Price != 0 {
		product.Price = request.Price
	}
	if request.CategoryID != product.Category.ID {
		product.Category.ID = request.CategoryID
	}
	product.UpdatedAt = time.Now()

	fmt.Println(product)

	responseUpdate, err := h.ProductRepository.UpdateProduct(id, product)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	responseJson := resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "SUCCESS",
		Data:    convertProductResponse(responseUpdate),
	}

	c.JSON(http.StatusOK, responseJson)
}

// delete product
func (h *productHandlers) DeleteProduct(c *gin.Context) {
	c.Header("Content-type", "application/json")

	id, _ := strconv.Atoi(c.Param("id"))
	product, err := h.ProductRepository.GetProduct(id)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	deleteResponse, err := h.ProductRepository.DeleteProduct(id, product)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	responseJson := resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "SUCCESS",
		Data:    convertProductResponse(deleteResponse),
	}

	c.JSON(http.StatusOK, responseJson)
}

// convert product response customer
func convertProductResponse(Product models.Product) productdto.ProductResponse {
	return productdto.ProductResponse{
		ID:          Product.ID,
		Name:        Product.Name,
		Category:    Product.Category,
		Qty:         Product.Qty,
		Price:       Product.Price,
		Image:       Product.Image,
		Description: Product.Description,
	}
}

func convertMultipleProductResponse(Product *[]models.Product) *[]productdto.ProductResponse {
	var ProductResponse []productdto.ProductResponse

	for _, product := range *Product {
		ProductResponse = append(ProductResponse, convertProductResponse(product))
	}

	return &ProductResponse
}
