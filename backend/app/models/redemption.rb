class Redemption < ApplicationRecord
  belongs_to :user
  belongs_to :reward

  scope :recent, -> { order(created_at: :desc) }
  scope :by_user, ->(user_id) { where(user_id: user_id) }
  scope :by_reward, ->(reward_id) { where(reward_id: reward_id) }

  validates :user_id, presence: true
  validates :reward_id, presence: true
  
  validate :user_has_sufficient_points, on: :create

  before_validation :set_redemption_cost, on: :create
  
  after_create :deduct_points_from_user
  after_destroy :refund_points_to_user

  private

  def set_redemption_cost
    self.redemption_cost ||= reward.cost if reward.present?
  end

  def user_has_sufficient_points
    if user.present? && redemption_cost.present? && user.points_balance < redemption_cost
      errors.add(:base, "User does not have enough points to redeem this reward.")
    end
  end

  def deduct_points_from_user
    user = User.find(user_id)
    user.points_balance -= redemption_cost   
    user.save!
  end

  def refund_points_to_user
    user = User.find(user_id)
    user.points_balance += redemption_cost
    user.save!
  end
end
