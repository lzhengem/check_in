class Destination < ActiveRecord::Base
    validates :address, presence: true
    # validates :longitude, uniqueness: { scope: :latitude }
    geocoded_by :address
    after_validation :geocode
    has_many :check_ins, dependent: :destroy
    
    def address=(s)
        super s.upcase
    end
end
