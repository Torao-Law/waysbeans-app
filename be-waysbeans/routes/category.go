package routes

import (
	"waysbeans-app/controllers"
	middleware "waysbeans-app/middlewares"
	"waysbeans-app/pkg/mysql"
	"waysbeans-app/repository"

	"github.com/gin-gonic/gin"
)

func Category(r *gin.RouterGroup) {
	repository := repository.MakeRepository(mysql.DB)
	controllers := controllers.CategoryContrroller(repository)

	r.POST("/category", middleware.Auth(), controllers.CreateCategory)
	r.GET("/categories", middleware.Auth(), controllers.FindCategories)
	r.GET("/category/:id", middleware.Auth(), controllers.GetCategory)
	r.PATCH("/category/:id", middleware.Auth(), controllers.UpdateCategory)
	r.DELETE("/category/:id", middleware.Auth(), controllers.DeleteCategory)
}
