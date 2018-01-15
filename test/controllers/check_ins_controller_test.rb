require 'test_helper'

class CheckInsControllerTest < ActionController::TestCase
  setup do
    @check_in = check_ins(:one)
    @destination = destinations(:ccsf)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:check_ins)
  end
  # unable to test with destination_id parameter
  # test "should get new" do
  #   get new_check_in_path(:destination_id => @destination.id)
  #   assert_response :success
  # end

  test "should create check_in" do
    assert_difference('CheckIn.count') do
      post :create, check_in: { destination_id: @destination.id, latitude: @check_in.latitude, location: @check_in.location, longitude: @check_in.longitude }
    end

    assert_redirected_to check_in_path(assigns(:check_in))
  end

  # test "should show check_in" do
  #   get :show, id: @check_in
  #   assert_response :success
  # end

  # test "should get edit" do
  #   get :edit, id: @check_in
  #   assert_response :success
  # end

  # test "should update check_in" do
  #   patch :update, id: @check_in, check_in: { destination_id: @check_in.destination_id, latitude: @check_in.latitude, location: @check_in.location, longitude: @check_in.longitude }
  #   assert_redirected_to check_in_path(assigns(:check_in))
  # end

  # test "should destroy check_in" do
  #   assert_difference('CheckIn.count', -1) do
  #     delete :destroy, id: @check_in
  #   end

  #   assert_redirected_to check_ins_path
  # end
end
