package routes

import (
	"github.com/ahmed/capstone_project/handler"
	"github.com/ahmed/capstone_project/middleware"
	"github.com/gin-gonic/gin"
)

func RegIsterRouter(r *gin.Engine) {
	ApiGroup := r.Group("api/")

	UserHandler := handler.RegisterUserHandler()
	ClassHandler := handler.RegisterClassHandler()
	UserGroup := ApiGroup.Group("/users")

	{
		UserGroup.POST("/register", middleware.Authenticated(), UserHandler.CreateUser)
		UserGroup.POST("/Login", UserHandler.LoginUser)
		UserGroup.GET("/whoami", middleware.Authenticated(), middleware.RequiredRole("ADMIN", "STUDENT_AFFAIRS", "CASHIER"), UserHandler.WhoAmI)
		UserGroup.POST("/Refresh_token", middleware.RefreshAuthenticated(), UserHandler.RefreshToken)
	}

	ClassGroup := ApiGroup.Group("/class")
	{
		ClassGroup.POST("/create", middleware.Authenticated(), middleware.RequiredRole("ADMIN", "STUDENT_AFFAIRS"), ClassHandler.CreateClass)
		ClassGroup.PUT("/update/:classid", middleware.Authenticated(), middleware.RequiredRole("ADMIN", "STUDENT_AFFAIRS"), ClassHandler.UpdateClass)
		ClassGroup.GET("/list", middleware.Authenticated(), middleware.RequiredRole("ADMIN", "STUDENT_AFFAIRS", "CASHIER"), ClassHandler.FindAll)
		ClassGroup.GET("/details/:classid", middleware.Authenticated(), middleware.RequiredRole("ADMIN", "STUDENT_AFFAIRS", "CASHIER"), ClassHandler.FindByid)
	}

}
