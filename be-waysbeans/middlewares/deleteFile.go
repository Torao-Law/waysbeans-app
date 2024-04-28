package middleware

import (
	"net/http"
	"os"
	resultdto "waysbeans-app/dto/result"

	"github.com/gin-gonic/gin"
)

func DeleteFile() gin.HandlerFunc {
	return func(c *gin.Context) {
		filename, exists := c.Get("dataFile")
		if !exists {
			c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
				Code:    http.StatusBadRequest,
				Message: "File not found",
			})
			return
		}

		if err := os.Remove("uploads/" + filename.(string)); err != nil {
			c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{
				Code:    http.StatusInternalServerError,
				Message: err.Error(),
			})
			return
		}

		c.Next()
	}
}
