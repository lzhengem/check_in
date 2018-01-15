module SessionsHelper
    def log_in(user)
        session[:user_id] = user.id
    end
    
    # returns current user if they are logged in
    def current_user
        # if @current user is not set, find it with the session id, otherwise return the @current_user
        @current_user ||= User.find_by(id: session[:user_id])
    end
    
    # check to see if the user is logged in
    def logged_in?
        !current_user.nil?
    end
    
    def log_out
        session.delete(:user_id)
        @current_user = nil
    end
end
