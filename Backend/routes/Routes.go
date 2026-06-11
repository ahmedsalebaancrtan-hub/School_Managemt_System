package routes

import (
	"github.com/ahmed/capstone_project/handler"
	"github.com/ahmed/capstone_project/middleware"
	"github.com/gin-gonic/gin"
)

func RegIsterRouter(r *gin.Engine) {
	ApiGroup := r.Group("/api")

	UserHandler := handler.RegisterUserHandler()
	ClassHandler := handler.RegisterClassHandler()
	FamilyHandler := handler.RegisterFamilyHandler()
	StudentHandler := handler.RegisterStudentHandler()
	StudentClassHandler := handler.RegisterStudentClass()
	MonthlyFeeHandler := handler.NewMonthlyFeeHandler()
	teacherHandler := handler.RegisterTeacherHandler()
	subjectHandler := handler.RegisterSubjectHandler()
	attendanceHandler := handler.RegisterAttendanceHandler()
	examHandler := handler.RegisterExamHandler()
	resultHandler := handler.RegisterResultHandler()
	UserGroup := ApiGroup.Group("/users")

	{
		UserGroup.POST("/register", UserHandler.CreateUser)
		UserGroup.POST("/Login", UserHandler.LoginUser)
		UserGroup.GET("/whoami", middleware.Authenticated(), middleware.RequiredRole("ADMIN", "STUDENT_AFFAIRS", "CASHIER"), UserHandler.WhoAmI)
		UserGroup.POST("/Refresh_token", middleware.RefreshAuthenticated(), UserHandler.RefreshToken)
	}

	ClassGroup := ApiGroup.Group("/class")
	{
		ClassGroup.POST("/create", middleware.Authenticated(), ClassHandler.CreateClass)
		ClassGroup.PUT("/update/:classid", middleware.Authenticated(), middleware.RequiredRole("ADMIN", "STUDENT_AFFAIRS"), ClassHandler.UpdateClass)
		ClassGroup.GET("/list", middleware.Authenticated(), middleware.RequiredRole("ADMIN", "STUDENT_AFFAIRS", "CASHIER"), ClassHandler.FindAll)
		ClassGroup.GET("/details/:classid", middleware.Authenticated(), middleware.RequiredRole("ADMIN", "STUDENT_AFFAIRS", "CASHIER"), ClassHandler.FindByid)
	}

	FamilyGroup := ApiGroup.Group("/family")
	{
		FamilyGroup.POST("/create", middleware.Authenticated(), middleware.RequiredRole("ADMIN", "CASHIER"), FamilyHandler.CreateFamily)
	}

	StudentGroup := ApiGroup.Group("/student")
	{
		StudentGroup.POST("/create", middleware.Authenticated(), middleware.RequiredRole("ADMIN", "STUDENT_AFFAIRS"), StudentHandler.CreateStudent)
		StudentGroup.GET("/list", middleware.Authenticated(), middleware.RequiredRole("ADMIN", "STUDENT_AFFAIRS", "CASHIER"), StudentHandler.ListStudent)
	}

	StudenClassGroup := ApiGroup.Group("/student_class")
	{
		StudenClassGroup.POST("/Add", middleware.Authenticated(), middleware.RequiredRole("ADMIN", "STUDENT_AFFAIRS"), StudentClassHandler.AddSTudentClass)
		StudenClassGroup.GET("/list/:class_id", middleware.Authenticated(), middleware.RequiredRole("ADMIN", "STUDENT_AFFAIRS", "CASHIER"), StudentClassHandler.FindClassStudentByClassID)
		StudenClassGroup.PUT("/Deactivate/:student_id", middleware.Authenticated(), middleware.RequiredRole("ADMIN", "STUDENT_AFFAIRS"), StudentClassHandler.DeactivateStudentclass)
	}
	MonthlyFeeGroup := ApiGroup.Group("/month_fee")
	{
		MonthlyFeeGroup.POST("/Generate", middleware.Authenticated(), middleware.RequiredRole("ADMIN", "CASHIER"), MonthlyFeeHandler.GenerateFee)
		MonthlyFeeGroup.GET("/list", middleware.Authenticated(), middleware.RequiredRole("ADMIN", "CASHIER"), MonthlyFeeHandler.ListMonthlyFee)
		MonthlyFeeGroup.POST("/pay", middleware.Authenticated(), middleware.RequiredRole("ADMIN", "CASHIER"), MonthlyFeeHandler.AcceptPayment)
	}
	TeacherGroup := ApiGroup.Group("/teacher")
	{
		TeacherGroup.POST("/create", middleware.Authenticated(), middleware.RequiredRole("ADMIN", "StudentAffairs"), teacherHandler.CreateTeacher)
		TeacherGroup.PUT("/update/:id", middleware.Authenticated(), middleware.RequiredRole("ADMIN", "StudentAffairs"), teacherHandler.UpdateTeacher)
		TeacherGroup.GET("/all", middleware.Authenticated(), middleware.RequiredRole("ADMIN", "StudentAffairs"), teacherHandler.GetAllTeachers)
		TeacherGroup.GET("/phone/:phone", middleware.Authenticated(), middleware.RequiredRole("ADMIN", "StudentAffairs"), teacherHandler.GetTeacherByPhone)
	}
	SubjectGroup := ApiGroup.Group("/subject")
	{
		SubjectGroup.POST("/create", middleware.Authenticated(), middleware.RequiredRole("ADMIN", "StudentAffairs"), subjectHandler.CreateSubject)
		SubjectGroup.GET("/all", middleware.Authenticated(), middleware.RequiredRole("ADMIN", "StudentAffairs"), subjectHandler.GetAllSubjects)
		SubjectGroup.PUT("/update/:id", middleware.Authenticated(), middleware.RequiredRole("ADMIN", "StudentAffairs"), subjectHandler.UpdateSubject)
	}
	timetableHandler := handler.RegisterTimetableHandler()

	TimetableGroup := ApiGroup.Group("/timetable")
	{
		// Only Admin or Student Affairs can write schedules
		TimetableGroup.POST("/slot", middleware.Authenticated(), middleware.RequiredRole("ADMIN", "StudentAffairs"), timetableHandler.CreateSlot)

		// Students, Cashiers, and Admins can all view class schedules
		TimetableGroup.GET("/class/:classId", middleware.Authenticated(), timetableHandler.GetClassSchedule)
	}
	AttendanceGroup := ApiGroup.Group("/attendance")
	{
		// Admin and Student Affairs can submit and review daily tracking logs
		AttendanceGroup.POST("/submit", middleware.Authenticated(), middleware.RequiredRole("ADMIN", "StudentAffairs"), attendanceHandler.SubmitAttendance)
		AttendanceGroup.GET("/sheet/:classId", middleware.Authenticated(), middleware.RequiredRole("ADMIN", "StudentAffairs"), attendanceHandler.GetDailySheet)
	}
	ExamGroup := ApiGroup.Group("/exam")
	{
		// Restricted entirely to administrators and academic managers
		ExamGroup.POST("/create", middleware.Authenticated(), middleware.RequiredRole("ADMIN", "StudentAffairs"), examHandler.CreateExam)
		ExamGroup.GET("/all", middleware.Authenticated(), examHandler.GetAllExams)
		ExamGroup.PATCH("/status/:id", middleware.Authenticated(), middleware.RequiredRole("ADMIN", "StudentAffairs"), examHandler.UpdateStatus)
	}
	ResultGroup := ApiGroup.Group("/result")
	{
		// Only Admin & Student Affairs can write or update exam grades
		ResultGroup.POST("/bulk-submit", middleware.Authenticated(), middleware.RequiredRole("ADMIN", "StudentAffairs"), resultHandler.SubmitResults)

		// Students and Parents can retrieve performance cards directly
		ResultGroup.GET("/report-card/:studentId", middleware.Authenticated(), resultHandler.GetReportCard)
	}
}
