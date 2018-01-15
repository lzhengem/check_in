module SessionsHelper
    def log_in(user)
        session[:user_id] = user.id
    end
    
    # returns current user if they are logged in
    def current_user
        # if there is a current session, use the id from there. else, use the cookie user id
        if session[:user_id]
            # if @current user is not set, find it with the session id, otherwise return the @current_user
            @current_user ||= User.find_by(id: session[:user_id])
        elsif cookies.signed[:user_id]
            user = User.find_by(id: cookies.signed[:user_id])
            if user && user.authenticated?(cookies[:remember_token])
                log_in user
                @current_user = user
            end
        end
    end
    
    # check to see if the user is logged in
    def logged_in?
        !current_user.nil?
    end
    
    def log_out
        session.delete(:user_id)
        @current_user = nil
    end
    
    # creates a new remember token, and sets the cookies to the user id and remember token
    def remember(user)
        user.remember
        # signed cookies encrypts the cookie before placing on browser
        cookies.permanent.signed[:user_id] = user.id
        cookies.permanent[:remember_token] = user.remember_token
    end
end
