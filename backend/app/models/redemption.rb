class Redemption < ApplicationRecord
  belongs_to :user
  belongs_to :reward

  scope :recent, -> { order(created_at: :desc) }
  scope :by_user, ->(user_id) { where(user_id: user_id) }
  scope :by_reward, ->(reward_id) { where(reward_id: reward_id) }

  validates :user_id, presence: true
  validates :reward_id, presence: true
  
  after_create :deduct_points_from_user

  after_destroy :refund_points_to_user

  private

  def deduct_points_from_user
    user = User.find(user_id)
    user.points_balance -= reward.cost    
    user.save!
  end

  def refund_points_to_user
    user = User.find(user_id)
    user.points_balance += reward.cost
    user.save!
  end
end
