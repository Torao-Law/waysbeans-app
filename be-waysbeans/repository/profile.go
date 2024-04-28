package repository

import "waysbeans-app/models"

type ProfileRepository interface {
	GetProfile(ID int) (models.Profiles, error)
	CreateProfile(Profile models.Profiles) (models.Profiles, error)
	UpdateProfile(ID int, Profile models.Profiles) (models.Profiles, error)
	DeleteProfile(ID int, Profile models.Profiles) (models.Profiles, error)
}

func (r *repository) GetProfile(ID int) (models.Profiles, error) {
	var Profile models.Profiles
	err := r.db.First(&Profile, ID).Error

	return Profile, err
}

func (r *repository) CreateProfile(Profile models.Profiles) (models.Profiles, error) {
	err := r.db.Create(&Profile).Error

	return Profile, err
}

func (r *repository) UpdateProfile(ID int, Profile models.Profiles) (models.Profiles, error) {
	err := r.db.Save(&Profile).Error

	return Profile, err
}

func (r *repository) DeleteProfile(ID int, Profile models.Profiles) (models.Profiles, error) {
	err := r.db.Delete(&Profile).Error

	return Profile, err
}
