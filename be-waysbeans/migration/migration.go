package migration

import (
	"fmt"
	"waysbeans-app/models"
	"waysbeans-app/pkg/mysql"
)

func RunAutoMigrate() {
	err := mysql.DB.AutoMigrate(
		&models.User{},
		&models.Product{},
		&models.Cart{},
		&models.Transaction{},
		&models.Profiles{},
		&models.Category{},
	)

	if err != nil {
		panic(err)
	}

	fmt.Println("Success Migration")
}
