package routes

import (
	"waysbeans-app/controllers"
	middleware "waysbeans-app/middlewares"
	"waysbeans-app/pkg/mysql"
	"waysbeans-app/repository"

	"github.com/gin-gonic/gin"
)

func Product(r *gin.RouterGroup) {
	Repository := repository.MakeRepository(mysql.DB)
	controllers := controllers.ProductHandlers(Repository)

	r.GET("/products", controllers.FindProducts)
	r.GET("/product/:id", controllers.GetProduct)
	r.POST("/product", middleware.Auth(), middleware.UploadFile(), controllers.CreateProduct)
	r.PATCH("/product/:id", middleware.Auth(), middleware.UploadFile(), controllers.UpdateProduct)
	r.DELETE("/product/:id", middleware.Auth(), controllers.DeleteProduct)
}
