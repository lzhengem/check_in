module SessionsHelper
    def log_in(user)
        session[:user_id] = user.id
    end
    
    def current_user
        # if @current user is not set, find it with the session id, otherwise return the @current_user
        @current_user ||= User.find_by(id: session[:user_id])
    end
end
