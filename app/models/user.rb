class User < ActiveRecord::Base
    before_save {self.email = email.downcase}
    validates :name, presence: true, length: {maximum: 50}
    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
    validates :email, presence: true, uniqueness: {case_sensitive: false}, 
                        length: {maximum: 255}, format: {with: VALID_EMAIL_REGEX}
    # this enforces validations on the virtual password and password_confirmation
    has_secure_password
    validates :password, presence: true, length: {minimum: 6}
    
    # retrusn the digest of the string bia BCRYPT. used to check password digest
    def User.digest(string)
        # if in testing, use lowest cost, if in production, user normal cost
        cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST : BCrypt::Engine.cost
        BCrypt::Password.create(string, cost: cost)
        
    end
    
    # for creating remember_token
    def User.new_token
        SecureRandom.urlsafe_base64
    end
end
