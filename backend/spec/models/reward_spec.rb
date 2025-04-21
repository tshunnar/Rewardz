require 'rails_helper'

RSpec.describe Reward, type: :model do
  let(:reward) { FactoryBot.build(:reward) }

  describe 'validations' do
    it 'is valid with valid attributes' do
      expect(reward).to be_valid
    end

    it 'is invalid without a title' do
      reward.title = nil
      expect(reward).not_to be_valid
    end

    it 'is invalid without a cost' do
      reward.cost = nil
      expect(reward).not_to be_valid
    end

    it 'is invalid with a negative cost' do
      reward.cost = -10
      expect(reward).not_to be_valid
    end
  end

  describe 'soft_delete' do
    it 'marks the reward as deleted' do
      reward.save
      expect(reward.is_deleted).to be false
      reward.soft_delete
      expect(reward.is_deleted).to be true
      expect(reward.deleted_at).not_to be_nil
    end
  end
end
