json.extract! check_in, :id, :location, :longitude, :latitude, :destination_id, :created_at, :updated_at
json.url check_in_url(check_in, format: :json)
