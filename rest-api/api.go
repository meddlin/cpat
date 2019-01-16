package main

import "github.com/gin-gonic/gin"
/*import "net/http"*/
import "fmt"

func setupRouter() *gin.Engine {
	// Disable Console Color
	// gin.DisableConsoleColor()
	r := gin.Default()

	// Ping test
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	return r
}

func main() {
	fmt.Printf("server up and listening...\n")

	r := setupRouter()
	// Listen and Server in 0.0.0.0:8080
	r.Run(":8080")
}