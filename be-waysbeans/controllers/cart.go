package controllers

import (
	"fmt"
	"net/http"
	"strconv"
	"time"
	cartdto "waysbeans-app/dto/cart"
	resultdto "waysbeans-app/dto/result"
	"waysbeans-app/models"
	"waysbeans-app/repository"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v5"
)

type cartControllers struct {
	CartRepository        repository.CartRepository
	TransactionRepository repository.TransactionRepository
}

func CartControllers(CartRepository repository.CartRepository, TransactionRepository repository.TransactionRepository) *cartControllers {
	return &cartControllers{
		CartRepository:        CartRepository,
		TransactionRepository: TransactionRepository,
	}
}

func (h *cartControllers) FindCarts(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	claims, _ := c.Get("userLogin")
	userClaims, ok := claims.(jwt.MapClaims)
	if !ok {
		c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Internal Server Error",
		})
		return
	}

	userID := int(userClaims["id"].(float64))

	liveTransaction, err := h.TransactionRepository.GetTransactionByUser(userID)
	if err != nil {
		response := resultdto.SuccessResult{
			Code:    http.StatusOK,
			Message: "SUCCESS",
			Data:    "No transaction",
		}

		c.JSON(http.StatusOK, response)
		return
	}

	cart, err := h.CartRepository.FindCarts(userID, liveTransaction.ID)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	response := resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "SUCCESS",
		Data:    convertMultipleCartResponse(cart),
	}

	c.JSON(http.StatusOK, response)
}

func (h *cartControllers) GetCart(c *gin.Context) {
	c.Header("Content-type", "application/json")
	claims, _ := c.Get("userLogin")
	userClaims, ok := claims.(jwt.MapClaims)
	if !ok {
		c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Internal Server Error",
		})
		return
	}

	userID := int(userClaims["id"].(float64))
	id, _ := strconv.Atoi(c.Param("id"))

	cart, err := h.CartRepository.GetCart(id, userID)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	response := resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "SUCCESS",
		Data:    convertCartResponse(cart),
	}

	c.JSON(http.StatusOK, response)
}

func (h *cartControllers) CreateCart(c *gin.Context) {
	c.Header("Content-type", "application/json")
	claims, _ := c.Get("userLogin")
	userClaims, ok := claims.(jwt.MapClaims)
	if !ok {
		c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Internal Server Error",
		})
		return
	}

	userID := int(userClaims["id"].(float64))
	transactionActive, errTrans := h.CartRepository.GetTransactionByUserID(userID, "new")

	if errTrans != nil {
		var err error
		var transactionIsMatch = false
		var transactionId int
		for !transactionIsMatch {
			transactionId = int(time.Now().Unix())
			transactionData, _ := h.TransactionRepository.GetTransaction(transactionId)
			if transactionData.ID == 0 {
				transactionIsMatch = true
			}
		}

		data := models.Transaction{
			ID:          transactionId,
			UserID:      userID,
			Status:      "new",
			TotalAmount: 0,
		}

		transactionActive, err = h.TransactionRepository.CreateTransaction(data)
		if err != nil {
			c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{
				Code:    http.StatusInternalServerError,
				Message: err.Error(),
			})
		}
	}

	request := new(cartdto.CartRequest)
	if err := c.Bind(&request); err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	validation := validator.New()
	err := validation.Struct(request)

	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	data := models.Cart{
		ProductID:     request.ProductID,
		TransactionID: transactionActive.ID,
		Order:         request.Order,
		UserID:        userID,
		SubAmount:     request.SubAmount,
	}

	cartResponse, err := h.CartRepository.CreateCart(data)

	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	response := resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "SUCCESS",
		Data:    convertCartResponse(cartResponse),
	}

	c.JSON(http.StatusOK, response)
}

func (h *cartControllers) UpdateCart(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	claims, _ := c.Get("userLogin")
	userClaims, ok := claims.(jwt.MapClaims)
	if !ok {
		c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Internal Server Error",
		})
		return
	}

	userID := int(userClaims["id"].(float64))

	request := new(cartdto.CartUpdate)
	if err := c.Bind(&request); err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	fmt.Println(request)

	id, _ := strconv.Atoi(c.Param("id"))
	data, err := h.CartRepository.GetCart(id, userID)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	if request.Order != data.Order {
		if request.Order != 0 {
			data.Order = request.Order
		}
	}

	if request.SubAmount != data.SubAmount {
		if request.SubAmount != 0 {
			data.SubAmount = request.SubAmount
		}
	}

	dataResponse, err := h.CartRepository.UpdateCart(id, data)

	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	dataToJson := resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "SUCCESS",
		Data:    convertCartResponse(dataResponse),
	}

	c.JSON(http.StatusOK, dataToJson)
}

func (h *cartControllers) DeleteCart(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	claims, _ := c.Get("userLogin")
	userClaims, ok := claims.(jwt.MapClaims)
	if !ok {
		c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Internal Server Error",
		})
		return
	}

	userID := int(userClaims["id"].(float64))

	id, _ := strconv.Atoi(c.Param("id"))
	data, err := h.CartRepository.GetCart(id, userID)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	deleteResponse, err := h.CartRepository.DeleteCart(data)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	responseJson := resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "SUCCESS",
		Data:    convertCartResponse(deleteResponse),
	}

	c.JSON(http.StatusOK, responseJson)
}

// convert single cart
func convertCartResponse(Cart models.Cart) cartdto.CartResponse {
	return cartdto.CartResponse{
		ID:            Cart.ID,
		Product:       Cart.Product.Name,
		Price:         Cart.Product.Price,
		Image:         Cart.Product.Image,
		Category:      Cart.Product.Category.Name,
		TransactionID: Cart.TransactionID,
		Order:         Cart.Order,
		SubAmount:     Cart.SubAmount,
		UserID:        Cart.UserID,
	}
}

// convert multiple cart
func convertMultipleCartResponse(Cart []models.Cart) []cartdto.CartResponse {
	var CartResponse []cartdto.CartResponse

	for _, cart := range Cart {
		CartResponse = append(CartResponse, convertCartResponse(cart))
	}

	return CartResponse
}
