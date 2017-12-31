class CreateCheckIns < ActiveRecord::Migration
  def change
    create_table :check_ins do |t|
      t.string :location
      t.float :longitude
      t.float :latitude
      t.references :destination, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
