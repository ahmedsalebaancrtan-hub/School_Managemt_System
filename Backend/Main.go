package main

import (
	"fmt"
	"log/slog"

	"github.com/ahmed/capstone_project/infra"
	"github.com/ahmed/capstone_project/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	slog.Info("initialised env variable")
	infra.InitEnv()

	Config := infra.Configuration

	slog.Info("Connect to database")
	infra.ConnectDb()
	slog.Info("connect database sucessfully ")

	r := gin.Default()

	routes.RegIsterRouter(r)

	slog.Info("application is running on port :500")

	r.Run(fmt.Sprintf(":%s", Config.Port))
}
