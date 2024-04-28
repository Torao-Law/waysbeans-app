package middleware

import (
	"io"
	"net/http"
	"os"
	resultdto "waysbeans-app/dto/result"

	"github.com/gin-gonic/gin"
)

func UploadFile() gin.HandlerFunc {
	return func(c *gin.Context) {
		file, err := c.FormFile("image")

		if err != nil {
			// Handle other errors if needed
			c.Set("dataFile", "") // Set dataFile to empty string if no image is uploaded
		} else {
			src, err := file.Open()
			if err != nil {
				c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
					Code:    http.StatusBadRequest,
					Message: err.Error(),
				})
				return
			}

			defer src.Close()

			tempFile, err := os.CreateTemp("uploads", "image-*.png")
			if err != nil {
				c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
					Code:    http.StatusBadRequest,
					Message: err.Error(),
				})
				return
			}

			defer tempFile.Close()

			if _, err := io.Copy(tempFile, src); err != nil {
				c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
					Code:    http.StatusBadRequest,
					Message: err.Error(),
				})
				return
			}

			data := tempFile.Name()
			filename := data[8:]

			c.Set("dataFile", filename)
		}

		c.Next()
	}
}
