class AddSoftDeleteToRewards < ActiveRecord::Migration[8.0]
  def change
    add_column :rewards, :is_deleted, :boolean, default: false, null: false
    add_column :rewards, :deleted_at, :datetime
  end
end
