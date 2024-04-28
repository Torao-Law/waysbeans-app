package controllers

import (
	"fmt"
	"log"
	"net/http"
	"time"
	authdto "waysbeans-app/dto/auth"
	resultdto "waysbeans-app/dto/result"
	"waysbeans-app/models"
	"waysbeans-app/pkg/bcrypt"
	jwtToken "waysbeans-app/pkg/jwt"
	"waysbeans-app/repository"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v5"
)

type authHandlers struct {
	AuthRepository repository.AuthRepository
}

func AuthHandlers(AuthRepository repository.AuthRepository) *authHandlers {
	return &authHandlers{AuthRepository}
}

// Register
func (h *authHandlers) Register(c *gin.Context) {
	c.Header("Content-Type", "application/json")

	request := new(authdto.RegisterRequest)
	if err := c.Bind(&request); err != nil {
		c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
		return
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
		return
	}

	password, err := bcrypt.HashingPassword(request.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	user := models.User{
		Name:     request.Name,
		Email:    request.Email,
		Password: password,
		Status:   "customer",
	}

	data, err := h.AuthRepository.Register(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	c.JSON(http.StatusOK, resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "SUCCESS",
		Data:    convertRegisterResponse(data)})
}

func (h *authHandlers) Login(c *gin.Context) {
	c.Header(c.ContentType(), "application/json")

	request := new(authdto.LoginRequest)
	if err := c.Bind(&request); err != nil {
		c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	user := models.User{
		Email:    request.Email,
		Password: request.Password,
	}

	data, err := h.AuthRepository.Login(user.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		})
	}

	isValid := bcrypt.CheckPasswordHash(user.Password, data.Password)
	if !isValid {
		c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Password is wrong",
		})
	}

	claims := jwt.MapClaims{}
	claims["id"] = data.ID
	claims["exp"] = time.Now().Add(time.Hour * 2).Unix()

	fmt.Println(time.Now().Add(time.Hour * 2))

	generatedToken, errGenerateToken := jwtToken.GenerateToken(&claims)
	if err != nil {
		log.Println(errGenerateToken)
		c.JSON(http.StatusUnauthorized, resultdto.ErrorResult{
			Code:    http.StatusUnauthorized,
			Message: "unauthorized",
		})
	}

	loginResponse := authdto.LoginResponse{
		Name:  data.Name,
		Email: data.Email,
		Token: generatedToken,
	}

	c.JSON(http.StatusOK, resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "SUCCESS",
		Data:    loginResponse,
	})
}

func (h *authHandlers) CheckAuth(c *gin.Context) {
	userLogin, _ := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	user, _ := h.AuthRepository.CheckAuth(int(userId))

	c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Message: "SUCCESS", Data: convertAuthResponse(user)})
}

func convertRegisterResponse(model models.User) authdto.RegisterResponse {
	return authdto.RegisterResponse{
		ID:       model.ID,
		Name:     model.Name,
		Status:   model.Status,
		Email:    model.Email,
		Password: model.Password,
	}
}

func convertAuthResponse(model models.User) authdto.LoginCheckResponse {
	return authdto.LoginCheckResponse{
		ID:     model.ID,
		Name:   model.Name,
		Status: model.Status,
		Email:  model.Email,
	}
}
