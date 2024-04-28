package routes

import (
	"waysbeans-app/controllers"
	middleware "waysbeans-app/middlewares"
	"waysbeans-app/pkg/mysql"
	"waysbeans-app/repository"

	"github.com/gin-gonic/gin"
)

func Profile(r *gin.RouterGroup) {
	ProfileRepository := repository.MakeRepository(mysql.DB)
	controllers := controllers.HandlerProfile(ProfileRepository)

	r.POST("/profile", middleware.Auth(), middleware.UploadFile(), controllers.CreateProfile)
	r.GET("/profile/:id", middleware.Auth(), controllers.GetProfile)
	r.PATCH("/profile/:id", middleware.Auth(), controllers.UpdateProfile)
	r.DELETE("/profile/:id", middleware.Auth(), controllers.DeleteProfile)
}
