class AddSoftDeleteToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :is_deleted, :boolean, default: false, null: false
    add_column :users, :deleted_at, :datetime
  end
end
