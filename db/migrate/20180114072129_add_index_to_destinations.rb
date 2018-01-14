class AddIndexToDestinations < ActiveRecord::Migration
  def change
    add_index :destinations, [:longitude, :latitude], unique: true
  end
end
