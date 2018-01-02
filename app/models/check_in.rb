class CheckIn < ActiveRecord::Base
  belongs_to :destination
  validates :destination, presence: true
end
