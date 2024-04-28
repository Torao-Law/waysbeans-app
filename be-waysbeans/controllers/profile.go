package controllers

import (
	"net/http"
	"strconv"
	"time"
	profiledto "waysbeans-app/dto/profile"
	resultdto "waysbeans-app/dto/result"
	"waysbeans-app/models"
	"waysbeans-app/repository"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

type profileHandler struct {
	ProfileRepository repository.ProfileRepository
}

func HandlerProfile(ProfileRepository repository.ProfileRepository) *profileHandler {
	return &profileHandler{ProfileRepository}
}

func (h *profileHandler) GetProfile(c *gin.Context) {
	c.Header("Content-type", "application/json")

	id, _ := strconv.Atoi(c.Param("id"))
	profile, err := h.ProfileRepository.GetProfile(id)

	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	responseJson := resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "SUCCESS",
		Data:    convertProfileResponse(profile),
	}

	c.JSON(http.StatusOK, responseJson)
}

func (h *profileHandler) CreateProfile(c *gin.Context) {
	c.Header("Content-Type", "application/json")

	request := new(profiledto.ProfileRequest)
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

	profile := models.Profiles{
		Gender:    request.Gender,
		Address:   request.Address,
		Image:     request.Image,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	responseCreate, err := h.ProfileRepository.CreateProfile(profile)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	responseJson := resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "SUCCESS",
		Data:    convertProfileResponse(responseCreate),
	}

	c.JSON(http.StatusOK, responseJson)
}

func (h *profileHandler) UpdateProfile(c *gin.Context) {
	c.Header("Content-type", "application/json")

	request := new(profiledto.ProfileRequest)
	if err := c.Bind(&request); err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	id, _ := strconv.Atoi(c.Param("id"))
	profile, err := h.ProfileRepository.GetProfile(id)

	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	response, err := h.ProfileRepository.UpdateProfile(id, profile)

	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	responseJson := resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "SUCCESS",
		Data:    convertProfileResponse(response),
	}

	c.JSON(http.StatusOK, responseJson)
}

func (h *profileHandler) DeleteProfile(c *gin.Context) {
	c.Header("Content-type", "application/json")

	id, _ := strconv.Atoi(c.Param("id"))
	profile, err := h.ProfileRepository.GetProfile(id)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	deleteResponse, err := h.ProfileRepository.DeleteProfile(id, profile)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	responseJson := resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "SUCCESS",
		Data:    convertProfileResponse(deleteResponse),
	}

	c.JSON(http.StatusOK, responseJson)
}

// convert single cart
func convertProfileResponse(Profile models.Profiles) profiledto.ProfileResponse {
	return profiledto.ProfileResponse{
		ID:      Profile.ID,
		Gender:  Profile.Gender,
		Address: Profile.Address,
		Image:   Profile.Image,
	}
}
