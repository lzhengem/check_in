require 'test_helper'

class UsersControllerTest < ActionController::TestCase
  # test "the truth" do
  #   assert true
  # end
  test "signup path should get new" do
    get signup_path
    assert_response :success
  end
end
