class User < ActiveRecord::Base
    before_save {self.email = email.downcase}
    validates :name, presence: true, length: {maximum: 50}
    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
    validates :email, presence: true, uniqueness: {case_sensitive: false}, 
                        length: {maximum: 255}, format: {with: VALID_EMAIL_REGEX}
    # this enforces validations on the virtual password and password_confirmation
    has_secure_password
    validates :password, presence: true, length: {minimum: 6}
    
    attr_accessor :remember_token
    
    # returns the digest of the string bia BCRYPT. used to check password digest
    def self.digest(string)
        # if in testing, use lowest cost, if in production, user normal cost
        cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST : BCrypt::Engine.cost
        BCrypt::Password.create(string, cost: cost)
        
    end
    
    # for creating remember_token
    def self.new_token
        SecureRandom.urlsafe_base64
    end
    
    # every time user logs in and wants to remember, then create new remember token for each new session
    def remember
        self.remember_token = User.new_token
        update_attribute(:remember_digest, User.digest(remember_token))
    end
    
    # checks to see if the remember token matches
    def authenticated?(remember_token)
        BCrypt::Password.new(remember_digest).is_password?(remember_token)
    end
    
    def forget
        update_attribute(:remember_digest, nil)
    end
end
