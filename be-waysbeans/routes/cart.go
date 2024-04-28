package routes

import (
	"waysbeans-app/controllers"
	middleware "waysbeans-app/middlewares"
	"waysbeans-app/pkg/mysql"
	"waysbeans-app/repository"

	"github.com/gin-gonic/gin"
)

func Cart(r *gin.RouterGroup) {
	repository := repository.MakeRepository(mysql.DB)
	controllers := controllers.CartControllers(repository, repository)

	r.GET("/carts", middleware.Auth(), controllers.FindCarts)
	r.GET("/cart/:id", middleware.Auth(), controllers.GetCart)
	r.POST("/cart", middleware.Auth(), controllers.CreateCart)
	r.PATCH("/cart/:id", middleware.Auth(), controllers.UpdateCart)
	r.DELETE("/cart/:id", middleware.Auth(), controllers.DeleteCart)
}
