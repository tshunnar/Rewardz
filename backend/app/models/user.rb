class User < ApplicationRecord
  scope :active, -> { where(is_deleted: false) }
  scope :deleted, -> { where(is_deleted: true) } 

  validates :email, presence: true, uniqueness: true
  validates :points_balance, numericality: { greater_than_or_equal_to: 0 }
  validates :name, presence: true

  def soft_delete
    update(is_deleted: true, deleted_at: Time.current)
  end
end
