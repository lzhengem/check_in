# Introduction
Check in is an app that allows for users to check in once they've reached their destination.

## Installation
* You can check this app out on [Heroku](https://check-in-app-lz.herokuapp.com/)

## Description
* You must first register for an account to create destination locations and check in.


## Usage
Example output:




uses geolocation to track the longitude and latitude of the user. 
It uses the google maps API to geocode the address to display to the user.

If the user is within 50m of the destination, then they are allowed to record their check in.

Users are able to add in new destinations by putting in the address. Using the geocoder gem,
it converts the address to longitude and latitude.

If using this app on a phone, make sure you allow your geolocation to be shared
and use https, not http because geolocation is only sent through secure network.
