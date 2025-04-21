require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { FactoryBot.build(:user) }

  it 'can run tests' do
    expect(user).to be_a(User)
  end

  describe 'validations' do
    it 'is valid with valid attributes' do
      expect(user).to be_valid
    end

    it 'is invalid without an email' do
      user.email = nil
      expect(user).not_to be_valid
    end

    it 'is invalid with a duplicate email' do
      FactoryBot.create(:user, email: user.email)
      expect(user).not_to be_valid
    end
    
    it 'is invalid with a negative points balance' do
      user.points_balance = -1
      expect(user).not_to be_valid
    end
  end

  describe 'soft_delete' do
    it 'marks the user as deleted' do
      user.save
      expect(user.is_deleted).to be false
      user.soft_delete
      expect(user.is_deleted).to be true
      expect(user.deleted_at).not_to be_nil
    end
  end
end
