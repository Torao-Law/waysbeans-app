package controllers

import (
	"fmt"
	"net/http"
	"os"
	"strconv"
	resultdto "waysbeans-app/dto/result"
	transactiondto "waysbeans-app/dto/transaction"
	"waysbeans-app/models"
	"waysbeans-app/repository"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"
)

type transactionHandlers struct {
	TransactionRepository repository.TransactionRepository
}

func TransactionHandlers(TransactionRepository repository.TransactionRepository) *transactionHandlers {
	return &transactionHandlers{TransactionRepository}
}

func (h *transactionHandlers) FindTransactions(c *gin.Context) {
	c.Header("Content-Type", "application/json")

	transaction, err := h.TransactionRepository.FindTransactions()
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	response := resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "SUCCESS",
		Data:    convertMultipleTransactionResponse(transaction),
	}

	c.JSON(http.StatusOK, response)
}

func (h *transactionHandlers) GetTransactionByUser(c *gin.Context) {
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

	transaction, err := h.TransactionRepository.GetTransactionByUser(userID)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	response := resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "SUCCESS",
		Data:    convertTransactionResponse(transaction),
	}

	c.JSON(http.StatusOK, response)
}

// func (h *transactionHandlers) CreateTransaction(c *gin.Context) {
// 	c.Header("Content-type", "application/json")
// 	claims, _ := c.Get("userLogin")
// 	userClaims, ok := claims.(jwt.MapClaims)
// 	if !ok {
// 		c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{
// 			Code:    http.StatusInternalServerError,
// 			Message: "Internal Server Error",
// 		})
// 		return
// 	}

// 	userID := int(userClaims["id"].(float64))
// 	request := new(transactiondto.CreateTransaction)
// 	if err := c.Bind(&request); err != nil {
// 		c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{
// 			Code:    http.StatusInternalServerError,
// 			Message: err.Error(),
// 		})
// 		return
// 	}

// 	transactionActive, _ := h.TransactionRepository.GetTransactionByUserID(userID, "new")
// 	if transactionActive.Status == "new" {
// 		response := resultdto.SuccessResult{
// 			Code:    http.StatusOK,
// 			Message: "SUCCESS",
// 			Data:    convertTransactionResponse(transactionActive),
// 		}
// 		c.JSON(http.StatusOK, response)
// 		return
// 	}

// 	validation := validator.New()
// 	if err := validation.Struct(request); err != nil {
// 		c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{
// 			Code:    http.StatusInternalServerError,
// 			Message: err.Error(),
// 		})
// 		return
// 	}

// 	data := models.Transaction{
// 		UserID:      userID,
// 		Status:      "new",
// 		TotalAmount: request.TotalAmount,
// 	}

// 	transactionResponse, err := h.TransactionRepository.CreateTransaction(data)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{
// 			Code:    http.StatusInternalServerError,
// 			Message: err.Error(),
// 		})
// 		return
// 	}

// 	response := resultdto.SuccessResult{
// 		Code:    http.StatusOK,
// 		Message: "SUCCESS",
// 		Data:    convertTransactionResponse(transactionResponse),
// 	}

// 	c.JSON(http.StatusOK, response)
// }

func (h *transactionHandlers) UpdateTransaction(c *gin.Context) {
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

	request := new(transactiondto.UpdateTransaction)
	if err := c.Bind(&request); err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	data, err := h.TransactionRepository.GetTransactionByUser(userID)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	data.TotalAmount = request.TotalAmount

	data.Status = "payment"

	dataResponse, err := h.TransactionRepository.UpdateTransaction(data)

	fmt.Println("request", request.TotalAmount)
	fmt.Println("data", data)
	fmt.Println("data RESPON", dataResponse)

	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	var s = snap.Client{}
	s.New(os.Getenv("SERVER_KEY"), midtrans.Sandbox)

	req := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  strconv.Itoa(dataResponse.ID),
			GrossAmt: int64(dataResponse.TotalAmount),
		},
		CreditCard: &snap.CreditCardDetails{
			Secure: true,
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: dataResponse.User.Name,
			Email: dataResponse.User.Email,
		},
	}

	snapResp, _ := s.CreateTransaction(req)

	dataToJson := resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "SUCCESS",
		Data:    snapResp,
	}

	c.JSON(http.StatusOK, dataToJson)
}

func (h *transactionHandlers) DeleteTransaction(c *gin.Context) {
	c.Header("Content-Type", "application/json")

	id, _ := strconv.Atoi(c.Param("id"))
	data, err := h.TransactionRepository.GetTransactionByUser(id)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	deleteResponse, err := h.TransactionRepository.DeleteTransaction(id, data)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	responseJson := resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "SUCCESS",
		Data:    convertTransactionResponse(deleteResponse),
	}

	c.JSON(http.StatusOK, responseJson)
}

// convert single cart
func convertTransactionResponse(Transaction models.Transaction) transactiondto.TransactionResponse {
	return transactiondto.TransactionResponse{
		ID:          Transaction.ID,
		User:        Transaction.User.Name,
		Status:      Transaction.Status,
		TotalAmount: Transaction.TotalAmount,
	}
}

// convert multiple cart
func convertMultipleTransactionResponse(Transaction []models.Transaction) []transactiondto.TransactionResponse {
	var TransactionResponse []transactiondto.TransactionResponse

	for _, transaction := range Transaction {
		TransactionResponse = append(TransactionResponse, convertTransactionResponse(transaction))
	}

	return TransactionResponse
}
