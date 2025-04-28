class AddRedemptionCostToRedemptions < ActiveRecord::Migration[8.0]
  def change
    add_column :redemptions, :redemption_cost, :bigint, null: true
  end

  def down
    remove_column :redemptions, :redemption_cost if column_exists?(:redemptions, :redemption_cost)
  rescue ActiveRecord::IrreversibleMigration
    puts "Cannot revert migration: #{self.class.name}. Please handle this manually."    
  end
end
