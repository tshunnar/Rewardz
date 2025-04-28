class User < ApplicationRecord
  scope :active, -> { where(is_deleted: false) }
  scope :deleted, -> { where(is_deleted: true) } 

  validates :email, presence: true, uniqueness: true
  validates :points_balance, numericality: { greater_than_or_equal_to: 0 }
  validates :name, presence: true

  before_validation :set_default_points_balance, on: :create

  private 

  def soft_delete
    update(is_deleted: true, deleted_at: Time.current)
  end

  def set_default_points_balance
    # log the points_balance value
    Rails.logger.debug "Points balance before default assignment: #{points_balance.inspect}"
    self.points_balance = 500 if points_balance.nil? || points_balance == 0 
    
  end
end
