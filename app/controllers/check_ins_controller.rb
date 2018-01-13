class CheckInsController < ApplicationController
  before_action :set_check_in, only: [:show, :edit, :update, :destroy]

  # GET /check_ins
  # GET /check_ins.json
  def index
    @check_ins = CheckIn.all
    @destinations = Destination.all
  end

  # GET /check_ins/1
  # GET /check_ins/1.json
  def show
  end

  # GET /check_ins/new
  def new
    @check_in = CheckIn.new
    @destination = Destination.find(destination_params[:destination_id])
    @is_new_check_in = true
  end

  # GET /check_ins/1/edit
  def edit
  end

  # POST /check_ins
  # POST /check_ins.json
  def create
    @check_in = CheckIn.new(check_in_params)

    respond_to do |format|
      if @check_in.save
        flash[:success] = 'Check in was successfully created.'
        format.html { redirect_to @check_in}
        # format.html { redirect_to check_ins_path}
        # format.json { render :show, status: :created, location: @check_in }
      else
        flash[:danger] = 'Did not successfully check in.'
        # format.html { render :new }
        format.html { redirect_to new_check_in_url(:destination_id => check_in_params[:destination_id] )}
        format.json { render json: @check_in.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /check_ins/1
  # PATCH/PUT /check_ins/1.json
  def update
    respond_to do |format|
      if @check_in.update(check_in_params)
        flash[:success] = 'Check in was successfully updated.' 
        format.html { redirect_to @check_in}
        format.json { render :show, status: :ok, location: @check_in }
      else
        flash[:danger] = "Did not successfully update."
        format.html { render :edit }
        format.json { render json: @check_in.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /check_ins/1
  # DELETE /check_ins/1.json
  def destroy
    @check_in.destroy
    respond_to do |format|
      flash[:success] = 'Check in was successfully destroyed.' 
      format.html { redirect_to check_ins_url}
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_check_in
      @check_in = CheckIn.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def check_in_params
      params.require(:check_in).permit(:location, :longitude, :latitude, :destination_id)
    end
    
    def destination_params
      params.permit(:destination_id)
    end
end
