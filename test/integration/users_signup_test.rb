require 'test_helper'

class UsersSignupTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  test "invalid signup information" do
    get signup_path
    assert_no_difference 'User.count' do
      post users_path, user: {name: "",
                                      email: "User@invalid",
                                      password: "foo",
                                      password_confirmation: "bar"}
    end
    assert_template 'users/new'
  end
  
  test "valid signup information" do
    get signup_path
    assert_difference 'User.count', 1 do
      post users_path, user: {name: "some name",
                                      email: "user@valid.com",
                                      password: "validpassword",
                                      password_confirmation: "validpassword"}
    end
    follow_redirect!
    assert_template 'users/show'
    # check that flash is not empty
    assert is_logged_in?
    assert_not flash.empty?
    
  end
end
