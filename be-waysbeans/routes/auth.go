package routes

import (
	"waysbeans-app/controllers"
	middleware "waysbeans-app/middlewares"
	"waysbeans-app/pkg/mysql"
	"waysbeans-app/repository"

	"github.com/gin-gonic/gin"
)

func Auth(r *gin.RouterGroup) {
	authRepository := repository.MakeRepository(mysql.DB)
	controllers := controllers.AuthHandlers(authRepository)

	r.POST("/auth/register", controllers.Register)
	r.POST("/auth/login", controllers.Login)
	r.GET("/auth/check", middleware.Auth(), controllers.CheckAuth)
}
