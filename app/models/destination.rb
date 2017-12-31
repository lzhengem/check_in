class Destination < ActiveRecord::Base
    validates :address, presence: true
    # validates :longitude, uniqueness: { scope: :latitude }
    geocoded_by :address
    after_validation :geocode
end
