package routes

import "github.com/gin-gonic/gin"

func RouteInit(r *gin.RouterGroup) {
	User(r)
	Product(r)
	Cart(r)
	Transaction(r)
	Profile(r)
	Auth(r)
	Category((r))
}
