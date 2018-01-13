class DestinationsController < ApplicationController
  before_action :set_destination, only: [:show, :edit, :update, :destroy]

  # GET /destinations
  # GET /destinations.json
  def index
    @destinations = Destination.all
  end

  # GET /destinations/1
  # GET /destinations/1.json
  def show
  end

  # GET /destinations/new
  def new
    @destination = Destination.new
    @is_new_destination = true
  end

  # GET /destinations/1/edit
  def edit
  end

  # POST /destinations
  # POST /destinations.json
  def create
    @destination = Destination.new(destination_params)

    respond_to do |format|
      if @destination.save
        flash[:success] = 'Destination was successfully created.'
        format.html { redirect_to @destination}
        format.json { render :show, status: :created, location: @destination }
      else
        flash[:danger] = "Destination did not create successfully."
        format.html { render :new }
        format.json { render json: @destination.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /destinations/1
  # PATCH/PUT /destinations/1.json
  def update
    respond_to do |format|
      if @destination.update(destination_params)
        flash[:success] = 'Destination was successfully updated.' 
        format.html { redirect_to @destination}
        format.json { render :show, status: :ok, location: @destination }
      else
        flash[:danger] = "Destination did not successfully update."
        format.html { render :edit }
        format.json { render json: @destination.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /destinations/1
  # DELETE /destinations/1.json
  def destroy
    @destination.destroy
    respond_to do |format|
      flash[:success]= 'Destination was successfully destroyed.' 
      format.html { redirect_to destinations_url}
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_destination
      @destination = Destination.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def destination_params
      params.require(:destination).permit(:address, :latitude, :longitude)
    end
end
