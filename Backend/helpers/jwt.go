package helpers

import (
	"time"

	"github.com/ahmed/capstone_project/infra"
	"github.com/golang-jwt/jwt"
)

func GenerateJwt(sub string, ExpireIn int64) (string, error) {
	config := infra.Configuration
	jwt_secret_key := []byte(config.JwtSecret)
	claims := jwt.MapClaims{
		"sub": sub,
		"npf": time.Now(),
		"exo": ExpireIn,
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwt_secret_key)
}
