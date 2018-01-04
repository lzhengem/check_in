class CheckIn < ActiveRecord::Base
  belongs_to :destination
  validates :destination, presence: true
  validates :longitude, :latitude, presence: true
end
