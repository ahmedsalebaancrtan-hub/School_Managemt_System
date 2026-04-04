package routes

import (
	"github.com/ahmed/capstone_project/handler"
	"github.com/ahmed/capstone_project/middleware"
	"github.com/gin-gonic/gin"
)

func RegIsterRouter(r *gin.Engine) {
	ApiGroup := r.Group("api/")

	UserHandler := handler.RegisterUserHandler()

	UserGroup := ApiGroup.Group("/users")

	{
		UserGroup.POST("/register", middleware.Authenticated(), middleware.RequiredRole("ADMIN"), UserHandler.CreateUser)
		UserGroup.POST("/Login", UserHandler.LoginUser)
		UserGroup.GET("/whoami", middleware.Authenticated(), middleware.RequiredRole("ADMIN", "STUDENT_AFFAIRS", "CASHIER"), UserHandler.WhoAmI)
		UserGroup.POST("/Refresh_token", middleware.RefreshAuthenticated(), UserHandler.RefreshToken)
	}

}
