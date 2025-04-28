require 'rails_helper'

RSpec.describe Redemption, type: :model do
  let(:user) { FactoryBot.create(:user, points_balance: 100) }
  let(:reward) { FactoryBot.create(:reward, cost: 50) }
  let(:redemption) { FactoryBot.build(:redemption, user: user, reward: reward) }

  describe 'validations' do
    it 'is valid with valid attributes' do
      expect(redemption).to be_valid
    end

    it 'is invalid without a user' do
      redemption.user = nil
      expect(redemption).not_to be_valid
    end

    it 'is invalid without a reward' do
      redemption.reward = nil
      expect(redemption).not_to be_valid
    end
  end

  describe 'associations' do
    it 'belongs to a user' do
      expect(redemption).to respond_to(:user)
    end

    it 'belongs to a reward' do
      expect(redemption).to respond_to(:reward)
    end
  end

  describe 'deduct_points_from_user' do
    it 'deducts the reward cost from the user points balance after creation' do
      expect { redemption.save }.to change { user.reload.points_balance }.from(100).to(50)
    end
  end

  describe 'refund_points_to_user' do
    it 'refunds the reward cost to the user points balance after destruction' do
      redemption.save
      expect { redemption.destroy }.to change { user.reload.points_balance }.from(50).to(100)
    end
  end

  describe 'redemption_cost' do
    it 'sets redemption_cost to reward.cost if not provided' do
      redemption.redemption_cost = nil
      redemption.save
      expect(redemption.redemption_cost).to eq(reward.cost)
    end

    it 'does not override redemption_cost if provided' do
      redemption.redemption_cost = 30
      redemption.save
      expect(redemption.redemption_cost).to eq(30)
    end
  end
end
