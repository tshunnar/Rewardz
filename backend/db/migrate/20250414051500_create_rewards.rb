class CreateRewards < ActiveRecord::Migration[8.0]
  def change
    create_table :rewards do |t|
      t.string :title
      t.string :description
      t.integer :cost

      t.timestamps
    end
  end
end
