package infra

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type AppConfig struct {
	Port       string
	DBHost     string
	DBUser     string
	DBPassword string
	DBPort     string
	DBName     string
	JwtSecret  string
}

var Configuration AppConfig

func InitEnv() {

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error Loading dotenv file")
	}
	Configuration.Port = os.Getenv("PORT")
	Configuration.DBHost = os.Getenv("DB_Host")
	Configuration.DBUser = os.Getenv("DB_User")
	Configuration.DBName = os.Getenv("DB_Name")
	Configuration.DBPassword = os.Getenv("DB_Password")
	Configuration.DBPort = os.Getenv("DB_Port")
	Configuration.JwtSecret = os.Getenv("jwt_secret_key")

}
