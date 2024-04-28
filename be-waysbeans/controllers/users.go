package controllers

import (
	"net/http"
	"strconv"
	"time"
	resultdto "waysbeans-app/dto/result"
	userdto "waysbeans-app/dto/user"
	"waysbeans-app/models"
	"waysbeans-app/repository"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

type handlers struct {
	UserRepository repository.UserRepository
}

func UserHandler(userRepository repository.UserRepository) *handlers {
	return &handlers{userRepository}
}

func (h *handlers) FindUsers(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	data, err := h.UserRepository.FindUsers()
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	response := resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "SUCCESS",
		Data:    data,
	}

	c.JSON(http.StatusOK, response)
}

func (h *handlers) GetUser(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	id, _ := strconv.Atoi(c.Param("id"))

	user, err := h.UserRepository.GetUser(id)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	c.JSON(http.StatusOK, resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "SUCCESS",
		Data:    convertDataResponse(user)})

}

func (h *handlers) CreateUser(c *gin.Context) {
	request := new(userdto.CreateUserRequest)
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

	user := models.User{
		Name:      request.Name,
		Status:    "customer",
		Email:     request.Email,
		Password:  request.Password,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
	data, err := h.UserRepository.CreateUser(user)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	c.JSON(http.StatusOK, resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "SUCCESS",
		Data:    convertDataResponse(data)})
}

func (h *handlers) UpdateUser(c *gin.Context) {
	request := new(userdto.UpdateUserRequest)
	if err := c.Bind(request); err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	id, _ := strconv.Atoi(c.Param("id"))

	user, err := h.UserRepository.GetUser(id)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	if request.Name != "" {
		user.Name = request.Name
	}
	if request.Email != "" {
		user.Email = request.Email
	}
	if request.Password != "" {
		user.Password = request.Password
	}

	user.UpdatedAt = time.Now()
	data, err := h.UserRepository.UpdateUser(user, int(id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: convertDataResponse(data)})
}

func (h *handlers) DeleteUser(c *gin.Context) {
	c.Header("Content-type", "application/json")
	id, _ := strconv.Atoi(c.Param("id"))

	user, err := h.UserRepository.GetUser(id)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	data, err := h.UserRepository.DeleteUser(user, id)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: convertDataResponse(data)})
}

func convertDataResponse(model models.User) userdto.UserResponse {
	return userdto.UserResponse{
		ID:       model.ID,
		Name:     model.Name,
		Status:   model.Status,
		Email:    model.Email,
		Password: model.Password,
	}
}
