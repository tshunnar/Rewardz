class Reward < ApplicationRecord
  scope :active, -> { where(is_deleted: false) }
  scope :deleted, -> { where(is_deleted: true) }  

  validates :title, presence: true
  validates :cost, numericality: { greater_than_or_equal_to: 0 }

  def soft_delete
    update(is_deleted: true, deleted_at: Time.current)
  end
end
