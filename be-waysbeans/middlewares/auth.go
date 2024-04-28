package middleware

import (
	"net/http"
	"strings"
	resultdto "waysbeans-app/dto/result"
	jwtToken "waysbeans-app/pkg/jwt"

	"github.com/gin-gonic/gin"
)

type Result struct {
	Code    int         `json:"code"`
	Data    interface{} `json:"data"`
	Message string      `json:"message"`
}

func Auth() gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.Request.Header.Get("Authorization")

		if token == "" {
			c.JSON(http.StatusUnauthorized, resultdto.ErrorResult{Code: http.StatusUnauthorized, Message: "unauthorized"})
			c.Abort()
			return
		}

		token = strings.Split(token, " ")[1]
		claims, err := jwtToken.DecodeToken(token)

		if err != nil {
			c.JSON(http.StatusUnauthorized, Result{Code: http.StatusUnauthorized, Message: "unauthorized"})
			c.Abort()
			return
		}

		c.Set("userLogin", claims)
		c.Next()
	}
}
