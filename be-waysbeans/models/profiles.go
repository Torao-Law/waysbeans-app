package models

import "time"

type Profiles struct {
	ID        int          `json:"id" gorm:"primary_key:auto_increment"`
	Gender    string       `json:"gender" gorm:"type: varchar(50)"`
	Address   string       `json:"address" gorm:"type: varchar(255)"`
	Image     string       `json:"image" gorm:"type: varchar(255)"`
	UserID    int          `json:"user_id"`
	User      UserResponse `json:"-"`
	CreatedAt time.Time    `json:"create_at"`
	UpdatedAt time.Time    `json:"update_at"`
}

type ProfileResponse struct {
	ID      int    `json:"id"`
	Gender  string `json:"gender"`
	Address string `json:"address"`
	Image   string `json:"image"`
}

func (ProfileResponse) TableName() string {
	return `profiles`
}
