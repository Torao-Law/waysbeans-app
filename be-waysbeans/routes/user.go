package routes

import (
	"waysbeans-app/controllers"
	middleware "waysbeans-app/middlewares"
	"waysbeans-app/pkg/mysql"
	"waysbeans-app/repository"

	"github.com/gin-gonic/gin"
)

func User(r *gin.RouterGroup) {
	userRepository := repository.MakeRepository(mysql.DB)
	controllers := controllers.UserHandler(userRepository)

	r.GET("/users", middleware.Auth(), controllers.FindUsers)
	r.GET("/user/:id", middleware.Auth(), controllers.GetUser)
	r.POST("/user", middleware.Auth(), controllers.CreateUser)
	r.PATCH("/user/:id", middleware.Auth(), controllers.UpdateUser)
	r.DELETE("/user/:id", middleware.Auth(), controllers.DeleteUser)
}
