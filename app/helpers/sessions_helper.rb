module SessionsHelper
    def log_in(user)
        session[:user_id] = user.id
    end
    
    # returns current user if they are logged in
    def current_user
        # if there is a current session, use the id from there. else, use the cookie user id
        if (user_id = session[:user_id])
            # if @current user is not set, find it with the session id, otherwise return the @current_user
            @current_user ||= User.find_by(id: user_id)
        elsif (user_id = cookies.signed[:user_id])
            user = User.find_by(id: user_id)
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
    
    # delete the user's remember token, remove the cookies if logout
    def forget(user)
        user.forget
        cookies.delete(:user_id)
        cookies.delete(:remember_token)
    end
    
    def log_out
        forget(current_user)
        session.delete(:user_id)
        @current_user = nil
    end
end
