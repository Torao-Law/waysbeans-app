package main

import (
	"fmt"
	"log"
	"net/http"
	"waysbeans-app/migration"
	"waysbeans-app/pkg/mysql"
	"waysbeans-app/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	mysql.AutoMigrate()
	migration.RunAutoMigrate()

	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"GET", "POST", "PATCH", "DELETE"},
		AllowHeaders: []string{"X-Requested-With", "Content-Type", "Authorization"},
	}))

	routes.RouteInit(r.Group("/api/v1"))

	fmt.Println("Server started")
	http.ListenAndServe("localhost:5000", r)
}
