package routes

import (
	"waysbeans-app/controllers"
	middleware "waysbeans-app/middlewares"
	"waysbeans-app/pkg/mysql"
	"waysbeans-app/repository"

	"github.com/gin-gonic/gin"
)

func Transaction(r *gin.RouterGroup) {
	repository := repository.MakeRepository(mysql.DB)
	controllers := controllers.TransactionHandlers(repository)

	r.GET("/transactions", middleware.Auth(), controllers.FindTransactions)
	r.GET("/transaction", middleware.Auth(), controllers.GetTransactionByUser)
	r.PATCH("/transaction", middleware.Auth(), controllers.UpdateTransaction)
	r.DELETE("/transaction/:id", middleware.Auth(), controllers.DeleteTransaction)
}
